/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../shim/array");
	require("../shim/object");

	var meta = require("../meta"),
		createClass = require("../class"),
		Listener = require("./listener");

	meta.define("../abstract/base", require("../abstract/base"));

	var Listeners = createClass(
		meta({
			"name": "Listeners",
			"extends": "../abstract/base",
			"description": "A catalog of listener instances"
		}),
		init
	);

	meta.undefine("../abstract/base");

	Listeners.method(
		meta({
			"name": "add",
			"description": "Creates a listener instance and add it to this listeners catalog",
			"arguments": [{
				"name": "targetId",
				"type": "number"
			}, {
				"name": "eventName",
				"type": "string"
			}, {
				"name": "handler",
				"type": "function"
			}],
			"returns": {
				"type": "object",
				"description": "new listeners key"
			}
		}),
		add
	);
	
	Listeners.method(
		meta({
			"name": "get",
			"description": "Gets a listener from the catalog",
			"arguments": [{
				"name": "listenerKey",
				"type": "object"
			}],
			"returns": {
				"type": "object|null",
				"description": "listener instance"
			}
		}),
		get
	);
	
	Listeners.method(
		meta({
			"name": "remove",
			"description": "Removes listener from the catalog by it's key",
			"arguments": [{
				"name": "listenerKey",
				"type": "object"
			}]
		}),
		remove
	);
	
	Listeners.method(
		meta({
			"name": "remove",
			"description": "Removes listener from the catalog by it's targetId",
			"arguments": [{
				"name": "targetId",
				"type": "number"
			}]
		}),
		removeByTargetId
	);
	
	Listeners.method(
		meta({
			"name": "remove",
			"description": "Removes listener from the catalog by it's targetId and eventName",
			"arguments": [{
				"name": "targetId",
				"type": "number"
			}, {
				"name": "eventName",
				"type": "string"
			}]
		}),
		removeByTargetAndEventName
	);
	
	function init (targetId, eventName, handler) {
		this.catalog = {};
	}

	function add (targetId, eventName, handler) {
		var listener = new Listener(targetId, eventName, handler),
			listenerKey = listener.getKey();
			
		this.catalog[listenerKey.listenerId] = listener;
		
		return listenerKey;
	}

	function get (listenerKey) {
		var listenerId = listenerKey.listenerId;

		return this.catalog[listenerId] || null;
	}

	function remove (listenerKey) {
		var listenerId = listenerKey.listenerId;

		if (listenerId) {
			this.catalog[listenerId] = null;
		}
	}
	
	function removeByTargetId (targetId) {
		var listeners = this.invoke(toArray),
			forTarget = this.proxy(isTarget, targetId);
		
		listeners.filter(forTarget).forEach(removeListener, this);
	}

	function removeByTargetAndEventName (targetId, eventName) {
		var listeners = this.invoke(toArray),
			forTargetAndEvent = this.proxy(isTargetAndEvent, targetId, eventName);
		
		listeners.filter(forTargetAndEvent).forEach(removeListener, this);
	}
	
	function removeListener (listener) {
		this.invoke(remove, listener.getKey());
	}

	function toArray () {
		return Object.keys(this.catalog).map(toListener, this);
	}

	function toListener (listenerId) {
		return this.catalog[listenerId];
	}

	function isTarget (targetId, listener) {
		return listener && listener.targetId === targetId;
	}
	
	function isTargetAndEvent (targetId, eventName, listener) {
		return listener && listener.targetId === targetId &&
				listener.eventName === eventName;
	}
	
	return Listeners;
});