define(
	[
		"solv/meta",
		"solv/class",
		"solv/util/id"
	],
	function (meta, createClass, Id) {
		"use strict";
		
		var Listener = createClass(
			meta({
				"name": "Listener",
				"type": "class",
				"description": "",
				"arguments": [{
					"name": "targetId",
					"type": "number"
				}, {
					"name": "eventName",
					"type": "string"
				}, {
					"name": "handler",
					"type": "function"
				}]
			}),
			init
		);
		
		Listener.method(
			meta({
				"name": "getKey",
				"arguments": [],
				"returns": {
					"type": "object",
					"properties": {
						"listenerId": "number"
					}
				}
			}),
			getKey
		);
		
		var id = new Id();
		
		function init (targetId, eventName, handler) {
			this.id = id.getNext();
			this.targetId = targetId;
			this.eventName = eventName;
			this.handler = handler;
		}
		
		function getKey () {
			return {
				listenerId: this.id
			};
		}
		
		return Listener;
	}
);