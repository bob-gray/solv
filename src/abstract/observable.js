/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("./base");
	require("./emitter");
	
	var Observable,
		changeEvent,
		propertyChangeEvent,
		meta = require("../meta"),
		createClass = require("../class/create");

	meta.setRequire(require);

	Observable = createClass(
		meta({
			"name": "Observable",
			"description": "General observable base class",
			"mixins": [
				"./base",
				"./emitter"
			]
		})
	);
	
	Observable.method(
		meta({
			"name": "set",
			"description": "Sets the value of a property",
			"arguments": [{
				"name": "property",
				"type": "string"
			}, {
				"name": "value",
				"type": "any"
			}]
		}),
		set
	);
	
	Observable.method(
		meta({
			"name": "get",
			"description": "Gets the value of a property",
			"arguments": [{
				"name": "property",
				"type": "string"
			}]
		}),
		get
	);
	
	changeEvent = meta({
		"name": "change",
		"when": "A property is set to a new value",
		"params": [{
			"name": "property",
			"type": "string"
		}, {
			"name": "oldValue",
			"type": "any"
		}, {
			"name": "newValue",
			"type": "any"
		}]
	});
	
	propertyChangeEvent = meta({
		"name": "<property>-change",
		"when": "A property is set to a new value",
		"params": [{
			"name": "property",
			"type": "string"
		}, {
			"name": "oldValue",
			"type": "any"
		}, {
			"name": "newValue",
			"type": "any"
		}]
	});
	
	function set (property, newValue) {
		var oldValue = this[property];
		
		if (newValue !== oldValue) {
			this[property] = newValue;
			this.invoke(triggerChange, property, oldValue, newValue);
		}
	}

	function triggerChange (property, oldValue, newValue) {
		propertyChangeEvent.name = property +"-change";
		this.trigger(propertyChangeEvent, property, oldValue, newValue);
		this.trigger(changeEvent, property, oldValue, newValue);
	}
	
	function get (property) {
		return this[property];
	}
	
	return Observable;
});