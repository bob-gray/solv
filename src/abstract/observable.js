if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";
	
	var meta = require("../meta"),
		createClass = require("../class/create");

	meta.define("./base", require("./base"));
	meta.define("./emitter", require("./emitter"));

	var Observable = createClass(
		meta({
			"name": "Observable",
			"description": "General observable base class",
			"mixins": [
				"./base",
				"./emitter"
			]
		})
	);
	
	meta.undefine("./base");
	meta.undefine("./emitter");
	
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
	
	var changeEvent = meta({
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
	
	var propertyChangeEvent = meta({
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
	
	function set (property, value) {
		var oldValue = this[property];
		
		if (value !== oldValue) {
			this[property] = value;
			propertyChangeEvent.name = property +"-change";
			this.trigger(propertyChangeEvent, property, oldValue, value);
			this.trigger(changeEvent, property, oldValue, value);
		}
	}
	
	function get (property) {
		return this[property];
	}
	
	return Observable;
});