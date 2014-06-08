/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../shim/date");
	require("../object/is-empty");

	var meta = require("../meta"),
		type = require("../type"),
		createClass = require("../class"),
		Callbacks = require("./callbacks"),
		Listeners = require("./listeners"),
		Id = require("../util/id"),
		InvalidEventParams = require("../error/invalid-event-params"),
		signatures = require("../function/signatures");

	meta.define("../abstract/base", require("../abstract/base"));

	var EventEngine = createClass(
		meta({
			"name": "EventEngine",
			"type": "class",
			"description": "Custom event system",
			"extends": "../abstract/base"
		}),
		init
	);

	meta.undefine("../abstract/base");

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
	
	EventEngine.method(
		meta({
			"name": "trigger",
			"description": "Executes all handler functions listening for the event on an object ",
			"arguments": [{
				"name": "target",
				"type": "object",
				"description": "thisArg within handlers"
			}, {
				"name": "options",
				"type": "object",
				"properties": {
					"name": "string",
					"when": "string",
					"params": "array"
				}
			}, {
				"name": "nArgs",
				"type": "any",
				"required": false,
				"repeating": true,
				"description": "Arguments to pass to handler functions"
			}]
		}),
		triggerWithOptions
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
		
		if (!callbacks) {
			callbacks = this.invoke(makeCallbacks, targetId, eventName);
		}
		
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
		var listener = this.listeners.get(listenerKey);
		
		if (listener) {
			this.invoke(removeHandler, listener);
			this.listeners.remove(listenerKey);
			this.invoke(cleanup, listener);
		}
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
			delete this.registry[targetId];
			delete target[this.expando];
		}
		
	}
	
	function trigger (target, eventName) {
		var targetId = this.invoke(getId, target),
			callbacks = this.invoke(getCallbacks, targetId, eventName),
			eventArgs = Array.from(arguments).slice(2);
		
		if (callbacks) {
			callbacks.execute(target, eventArgs);
		}
	}
	
	function triggerWithOptions (target, options) {
		var eventParams = Array.from(arguments).slice(2),
			triggerArgs = [
				target,
				options.name
			];
			
		if (options.params) {
			validateEventParams(eventParams, options.params, options.name);
		}

		triggerArgs = triggerArgs.concat(eventParams);
		this.trigger.apply(this, triggerArgs);
	}
	
	function validateEventParams (eventParams, paramsMeta, eventName) {
		var eventSignature = signatures.getSignatureFromMeta(paramsMeta),
			tester = signatures.compileImplementationSignature(eventSignature),
			paramsSignature;

		if (isArray(paramsMeta)) {
			paramsSignature = signatures.getInvocationSignature(eventParams);

		} else if (isObject(paramsMeta)) {
			paramsSignature = signatures.getObjectSignature(eventParams[0]);
		}

		if (!tester.test(paramsSignature)) {
			throw new InvalidEventParams({
				eventName: eventName,
				expected: eventSignature,
				actual: paramsSignature
			});
		}
	}
	
	function getId (target) {
		this.invoke(stamp, target);
		return target[this.expando];
	}
	
	function getCallbacks (targetId, eventName) {
		var handlers = this.registry[targetId],
			callbacks;
		
		if (handlers) {
			callbacks = handlers[eventName];
		}
		
		return callbacks;
	}
	
	function makeCallbacks (targetId, eventName) {
		var handlers = this.registry[targetId],
			callbacks = new Callbacks();
		
		if (!handlers) {
			handlers = {};
			this.registry[targetId] = handlers;
		}
		
		handlers[eventName] = callbacks;
		
		return callbacks;
	}
	
	function removeHandler (listener) {
		var callbacks = this.invoke(getCallbacks, listener.targetId, listener.eventName);
		
		if (callbacks) {
			callbacks.remove(listener.handler);
		}
	}
	
	function cleanup (listener) {
		var handlers = this.registry[listener.targetId],
			callbacks;
		
		if (handlers) {
			callbacks = handlers[listener.eventName];
			
			if (callbacks && callbacks.isEmpty()) {
				delete handlers[listener.eventName];
			}
			
			if (Object.isEmpty(handlers)) {
				delete this.registry[listener.targetId];
			}
		}
	}
	
	function stamp (target) {
		if (!target[this.expando]) {
			target[this.expando] = id.getNext();
		}
	}

	function isArray (value) {
		return type.is("array", value);
	}

	function isObject (value) {
		return type.is("object", value);
	}
	
	return EventEngine;
});