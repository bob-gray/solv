/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var Listener,
		meta = require("../meta"),
		createClass = require("../class"),
		Id = require("../util/id"),
		id = new Id();

	Listener = createClass(
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
});