/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../shim/object");
	require("../shim/array");
	require("../class/method");

	var meta = require("../meta"),
		type = require("../type"),
		utils = require("./utils"),
		originals,
		copies;

	/*meta({
		"name": "Object",
		"type": "class",
		"global": true
	})*/

	Object.method(
		meta({
			"name": "clone",
			"static": true,
			"shim": true,
			"description": "Creates a deep copy of all own properties that are types object, array, number, string, boolean, null, undefined. Circular references are supported.",
			"arguments": [{
				"name": "source",
				"type": "object|array"
			}],
			"returns": "object|array"
		}),
		clone
	);

	function clone (source) {
		setup();
		var target = getTargetValue(source);
		teardown();

		return target;
	}

	function setup () {
		originals = [];
		copies = [];
	}

	function teardown () {
		originals = null;
		copies = null;
	}

	function assign (target, name) {
		var value = this[name],
			valueType = type.of(value),
			targetValue;

		if (utils.complex.test(valueType)) {
			target[name] = getTargetValue(value);

		} else if (utils.simple.test(valueType)) {
			target[name] = value;
		}

		return target;
	}

	function getTargetValue (value) {
		var index = originals.indexOf(value),
			targetValue;

		if (index > -1) {
			targetValue = copies[index];

		} else {
			targetValue = utils.getEmpty(type.of(value));
			originals.push(value);
			copies.push(targetValue);
			targetValue = utils.copy(assign, targetValue, value);
		}

		return targetValue;
	}
});