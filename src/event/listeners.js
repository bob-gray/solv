define(
	[
		"solv/meta",
		"solv/class",
		"solv/event/listener",
		"solv/abstract/base",
		"solv/shim/array",
		"solv/shim/object"
	],
	function (meta, createClass, Listener) {
		"use strict";
		
		var Listeners = createClass(
			meta({
				"name": "Listeners",
				"type": "class",
				"description": "A catalog of listener instances",
				"extends": "solv/abstract/base"
			}),
			init
		);
		
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
					"type": "object",
					"description": "listener instance"
				}
			}),
			get
		);
		
		Listeners.method(
			meta({
				"name": "remove",
				"description": "Removes listener from the catalog",
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
		
		Listener.method(
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

			return this.catalog[listenerId];
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
			
			listeners.filter(forTarget).forEach(remove, this);
		}
		
		function removeByTargetAndEventName (targetId, eventName) {
			var listeners = this.invoke(toArray),
				forTargetAndEvent = this.proxy(isTargetAndEvent, targetId);
			
			listeners.filter(forTargetAndEvent).forEach(remove, this);
		}
		
		function toArray () {
			return Object.keys(this.catalog).map(toListener, this);
		}
		
		function toListener (listenerId) {
			return this.catalog[listenerId];
		}
		
		function isTarget (targetId, listener) {
			return targetId !== listener.targetId;
		}
		
		function isTargetAndEvent (targetId, eventName, listener) {
			return targetId !== listener.targetId || eventName !== listener.targetId;
		}
		
		return Listeners;
	}
);