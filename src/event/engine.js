define(
	[
		"solv/meta",
		"solv/type",
		"solv/class",
		"solv/event/callbacks",
		"solv/event/listeners",
		"solv/util/id",
		"solv/abstract/base",
		"solv/shim/date",
		"solv/object/is-empty"
	],
	function (meta, type, createClass, Callbacks, Listeners, Id) {
		"use strict";
		
		var EventEngine = createClass(
			meta({
				"name": "EventEngine",
				"type": "class",
				"description": "",
				"extends": "solv/abstract/base"
			}),
			init
		);
		
		EventEngine.method(
			meta({
				"name": "addListener",
				"description": "Adds a listener to an object",
				"arguments": [{
					"name": "target",
					"type": "object"
				}, {
					"name": "eventName",
					"type": "string"
				}, {
					"name": "handler",
					"type": "function"
				}],
				"returns": {
					"type": "object",
					"description": "Event listener key; can be used to remove listener"
				}
			}),
			addListener
		);
		
		EventEngine.method(
			meta({
				"name": "addListenerOnce",
				"description": "Adds a listener to an object which will be removed after the first trigger",
				"arguments": [{
					"name": "target",
					"type": "object"
				}, {
					"name": "eventName",
					"type": "string"
				}, {
					"name": "handler",
					"type": "function"
				}],
				"returns": {
					"type": "object",
					"description": "Event listener key; can be used to remove listener"
				}
			}),
			addListenerOnce
		);
		
		EventEngine.method(
			meta({
				"name": "removeListener",
				"description": "Removes a listener from an object",
				"arguments": [{
					"name": "target",
					"type": "object"
				}, {
					"name": "listenerKey",
					"type": "object",
					"description": "Returned from addListener or addListenerOnce"
				}]
			}),
			removeListener
		);
		
		EventEngine.method(
			meta({
				"name": "removeListeners",
				"description": "Removes all listeners of an event name from an object",
				"arguments": [{
					"name": "target",
					"type": "object"
				}, {
					"name": "eventName",
					"type": "string"
				}]
			}),
			removeListeners
		);
		
		EventEngine.method(
			meta({
				"name": "removeAllListeners",
				"description": "Removes all listeners from an object",
				"arguments": [{
					"name": "target",
					"type": "object"
				}]
			}),
			removeAllListeners
		);
		
		EventEngine.method(
			meta({
				"name": "trigger",
				"description": "Executes all handler functions listening for the event on an object ",
				"arguments": [{
					"name": "target",
					"type": "object",
					"description": "thisArg within handlers"
				}, {
					"name": "eventName",
					"type": "string"
				}, {
					"name": "nArgs",
					"type": "any",
					"required": false,
					"repeating": true,
					"description": "Arguments to pass to handler functions"
				}]
			}),
			trigger
		);
		
		var id = new Id();
		
		function init () {
			this.expando = "events-"+ Date.now();
			this.registry = {};
			this.listeners = new Listeners();
		}
		
		function addListener (target, eventName, handler) {
			var targetId = this.invoke(getId, target),
				listenerKey = this.listeners.add(targetId, eventName, handler),
				callbacks = this.invoke(getCallbacks, targetId, eventName);
			
			callbacks.add(handler);
			
			return listenerKey;
		}
		
		function addListenerOnce (target, eventName, handler) {
			var listenerKey = this.addListener(target, eventName, executeAndRemove),
				remove = this.proxy("removeListener", target, listenerKey);
			
			function executeAndRemove () {
				handler.apply(this, arguments);
				remove();
			}
			
			return listenerKey;
		}
		
		function removeListener (target, listenerKey) {
			var listener = this.listeners.get(listenerKey),
				handlers,
				callbacks;
			
			if (listener) {
				handlers = this.registry[listener.targetId];
			}
			
			if (handlers) {
				callbacks = handlers[listener.eventName];
			}
			
			if (callbacks) {
				callbacks.remove(listener.handler);
			}
			
			if (callbacks && callbacks.isEmpty()) {
				delete handlers[listener.eventName];
			}
			
			if (handlers && Object.isEmpty(handlers)) {
				delete this.registry[listener.targetId];
			}
			
			this.listeners.remove(listenerKey);
		}

		function removeListeners (target, eventName) {
			var targetId = target[this.expando],
				handlers;

			if (targetId) {
				this.listeners.remove(targetId, eventName);
				handlers = this.registry[targetId];
				
				if (handlers) {
					delete handlers[eventName];
				}
				
				if (handlers && Object.isEmpty(handlers)) {
					delete this.registry[targetId];
				}
			}
		}

		function removeAllListeners (target) {
			var targetId = target[this.expando];
				
			if (targetId) {
				this.listeners.remove(targetId);
				this.registry[targetId] = null;
			}
			
		}
		
		function trigger (target, eventName) {
			var targetId = this.invoke(getId, target),
				callbacks = this.invoke(getCallbacks, targetId, eventName),
				eventArgs = Array.from(arguments).slice(2);
			
			callbacks.execute(target, eventArgs);
		}
		
		function getId (target) {
			this.invoke(stamp, target);
			return target[this.expando];
		}
		
		function getCallbacks (targetId, eventName) {
			var handlers = this.invoke(getHandlers, targetId),
				callbacks = handlers[eventName];
			
			if (!callbacks) {
				callbacks = new Callbacks();
				handlers[eventName] = callbacks;
			}
			
			return callbacks;
		}
		
		function stamp (target) {
			if (!target[this.expando]) {
				target[this.expando] = id.getNext();
			}
		}
		
		function getHandlers (targetId) {
			var handlers = this.registry[targetId];
			
			if (!handlers) {
				handlers = {};
				this.registry[targetId] = handlers;
			}
			
			return handlers;
		}
		
		return EventEngine;
	}
);