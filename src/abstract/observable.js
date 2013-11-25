define(
	[
		"solv/meta",
		"solv/class",
		"solv/abstract/base",
		"solv/abstract/emitter"
	],
	function (meta, createClass) {
		"use strict";
		
		var Observable = createClass(
			meta({
				"name": "Observable",
				"description": "",
				"mixins": [
					"solv/abstract/base",
					"solv/abstract/emitter"
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
				}, {
					"name": "value",
					"type": "any"
				}]
			}),
			get
		);
		
		var changeEvent = meta({
			"name": "change",
			"when": "A property is set to a new value",
			"arguments": [{
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
			"arguments": [{
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
	}
);