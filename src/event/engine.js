/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

/* jshint -W072 */ // addListener & addListenerOnce have 4 params
define(function (require) {
	"use strict";

	require("../abstract/base");
	require("../shim/date");
	require("../object/is-empty");
	require("../array/from");
	require("../shim/function");
	require("../function/constrict");

	var EventEngine,
		meta = require("../meta"),
		type = require("../type"),
		createClass = require("../class"),
		Callbacks = require("./callbacks"),
		Listeners = require("./listeners"),
		EventName = require("./name"),
		InvalidEventParams = require("../error/invalid-event-params"),
		signatures = require("../function/signatures"),
		Id = require("../util/id"),
		id = new Id(),
		wildcard = "*";

	meta.setRequire(require);

	EventEngine = createClass(
		meta({
			"name": "EventEngine",
			"type": "class",
			"description": "Custom event system",
			"extends": "../abstract/base"
		}),
		init
	);

	EventEngine.method(
		meta({
			"name": "addListener",
			"description": "Adds a listener to an object",
			"arguments": [{
				"name": "options",
				"type": "object",
				"properties": {
					"target": "object",
					"eventName": "string",
					"handler": "function",
					"passEventArg": "boolean"
				}
			}],
			"returns": {
				"type": "object",
				"description": "Event listener key; can be used to remove listener"
			}
		}),
		addListenerWithOptions
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
				"type": "string",
				"description": "An asterisk \"*\" can be used to listen to all events"
			}, {
				"name": "handler",
				"type": "function"
			}, {
				"name": "passEventArg",
				"type": "boolean",
				"default": false
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
				"name": "options",
				"type": "object",
				"properties": {
					"target": "object",
					"eventName": "string",
					"handler": "function",
					"passEventArg": "boolean"
				}
			}],
			"returns": {
				"type": "object",
				"description": "Event listener key; can be used to remove listener"
			}
		}),
		addListenerOnceWithOptions
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
				"type": "string",
				"description": "An asterisk \"*\" can be used to listen to all events"
			}, {
				"name": "handler",
				"type": "function"
			}, {
				"name": "passEventArg",
				"type": "boolean",
				"default": false
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
			"description": "Executes all handler functions listening for the event on an object",
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
			"description": "Executes all handler functions listening for the event on an object",
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

	/*meta({
		"name": "Event",
		"opaque": true,
		"properties": {
			"name": "string"
		}
	})

	meta({
		"name": "cancel",
		"arguments": []
	})*/

	function init () {
		this.expando = "events-"+ Date.now();
		this.registry = {};
		this.listeners = new Listeners();
	}

	function addListenerWithOptions (options) {
		return this.addListener(
			options.target,
			options.eventName,
			options.handler,
			options.passEventArg
		);
	}

	function addListener (target, eventName, handler, passEventArg) {
		var targetId = this.invoke(getId, target),
			callbacks = this.invoke(getCallbacks, targetId, eventName),
			listenerKey;

		if (passEventArg) {
			handler = wrap(handler);

		} else {
			handler = handler.constrict(1);
		}

		listenerKey = this.listeners.add(targetId, eventName, handler);

		if (!callbacks) {
			callbacks = this.invoke(makeCallbacks, targetId, eventName);
		}

		callbacks.add(handler);

		return listenerKey;
	}

	function addListenerOnceWithOptions (options) {
		return this.addListenerOnce(
			options.target,
			options.eventName,
			options.handler,
			options.passEventArg
		);
	}

	function addListenerOnce (target, eventName, handler, passEventArg) {
		var listenerKey = this.addListener(target, eventName, executeAndRemove, passEventArg),
			remove = this.proxy("removeListener", listenerKey);

		function executeAndRemove () {
			handler.apply(this, arguments);
			remove();
		}

		return listenerKey;
	}

	/* jshint +W072 */

	function removeListener (listenerKey) {
		var listener = this.listeners.get(listenerKey);

		if (listener) {
			this.invoke(removeHandler, listener);
			this.listeners.remove(listenerKey);
			this.invoke(cleanup, listener);
		}
	}

	function removeListeners (target, eventName) {
		var targetId = target[this.expando],
			eventNames;

		if (targetId) {
			eventNames = this.invoke(getEventNames, targetId, eventName);
			eventNames.forEach(this.proxy(removeListenersByEventName, targetId));
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
			callbacks = this.invoke(getTriggerCallbacks, targetId, eventName),
			eventArgs,
			event;

		if (callbacks) {
			event = new Event(eventName, callbacks);
			eventArgs = Array.from(arguments).slice(2);
			eventArgs.unshift(event);
			callbacks.execute(target, eventArgs);
		}
	}

	function getEventNames (targetId, eventName) {
		var handlers = this.registry[targetId],
			eventNames = [];

		if (handlers) {
			eventNames = Object.keys(handlers);
			eventName = new EventName(eventName);

			if (eventName.isNamespaced()) {
				eventNames = eventName.filter(eventNames);

			} else {
				eventNames.push(eventName.toString());
			}
		}

		return eventNames;
	}

	function removeListenersByEventName (targetId, eventName) {
		var handlers = this.registry[targetId];

		this.listeners.remove(targetId, eventName);

		if (handlers) {
			delete handlers[eventName];
		}

		if (handlers && Object.isEmpty(handlers)) {
			delete this.registry[targetId];
		}
	}

	function Event (eventName, callbacks) {
		this.name = eventName;
		this.cancel = callbacks.abort.bind(callbacks);
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
			paramsSignature = getParamsSignature(eventParams, paramsMeta);

		if (!tester.test(paramsSignature)) {
			throw new InvalidEventParams({
				eventName: eventName,
				expected: eventSignature,
				actual: paramsSignature
			});
		}
	}

	function getParamsSignature (eventParams, paramsMeta) {
		var paramsSignature;

		if (isArray(paramsMeta)) {
			paramsSignature = signatures.getInvocationSignature(eventParams);

		} else if (isObject(paramsMeta)) {
			paramsSignature = signatures.getObjectSignature(eventParams[0]);
		}

		return paramsSignature;
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

	function getTriggerCallbacks (targetId, eventName) {
		var callbacks = this.invoke(getCallbacksByNamespace, targetId, eventName),
			wildcards = this.invoke(getCallbacks, targetId, wildcard);

		if (callbacks && wildcards) {
			callbacks = callbacks.concat(wildcards);

		} else if (wildcards) {
			callbacks = wildcards;
		}

		return callbacks;
	}

	function getCallbacksByNamespace (targetId, eventName) {
		var toCallbacks = this.proxy(getCallbacks, targetId),
			callbacks;

		eventName = new EventName(eventName);

		if (eventName.isNamespaced()) {
			callbacks = eventName.expand().map(toCallbacks).filter(whereFound).reduce(toMerged, new Callbacks());

		} else {
			callbacks = toCallbacks(eventName.toString());
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

	function wrap (handler) {
		return function () {
			return handler.apply(this, arguments);
		};
	}

	function isArray (value) {
		return type.is("array", value);
	}

	function isObject (value) {
		return type.is("object", value);
	}

	function whereFound (callbacks) {
		return !!callbacks;
	}

	function toMerged (merged, callbacks) {
		return merged.concat(callbacks);
	}

	return EventEngine;
});