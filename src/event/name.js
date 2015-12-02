/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../abstract/base");
	require("../string/contains");
	require("../string/interpolate");
	require("../regexp/escape");

	var EventName,
		createClass = require("solv/class"),
		meta = require("../meta");

	meta.setRequire(require);

	EventName = createClass(
		meta({
			"name": "EventName",
			"extends": "../abstract/base",
			"properties": {
				"name": "string",
				"delimiter": "string"
			},
			"arguments": [{
				"name": "eventName",
				"type": "string"
			}, {
				"name": "delimiter",
				"type": "string",
				"default": "."
			}]
		}),
		init
	);

	EventName.method(
		meta({
			"name": "filter",
			"description": "Filters an array of event names returning those that are under the namespace of this.name",
			"arguments": [{
				"name": "eventNames",
				"type": "array"
			}],
			"returns": "array"
		}),
		filter
	);

	EventName.method(
		meta({
			"name": "toString",
			"description": "return this.name",
			"arguments": [],
			"returns": "string"
		}),
		toString
	);

	function init (name, delimiter) {
		this.name = name;
		this.delimiter = delimiter;
	}

	function filter (eventNames) {
		this.invoke(createTester);
		return eventNames.filter(underNamespace, this);
	}

	function toString () {
		return this.name;
	}

	function createTester () {
		var pattern = "^{name}(?:{delimiter}|$)".interpolate({
			name: RegExp.escape(this.name),
			delimiter: RegExp.escape(this.delimiter)
		});

		this.tester = new RegExp(pattern);
	}

	function underNamespace (eventName) {
		return this.tester.test(eventName);
	}

	return EventName;
});