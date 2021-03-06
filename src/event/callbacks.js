/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../abstract/base");
	require("../array/shim");
	require("../array/copy");
	require("../array/empty");
	require("../array/is-empty");
	require("../array/remove");
	require("../array/from");

	var Callbacks,
		meta = require("../meta"),
		createClass = require("../class"),
		type = require("../type");

	meta.setRequire(require);

	Callbacks = createClass(
		meta({
			"name": "Callbacks",
			"extends": "../abstract/base",
			"description": "A queue of callback functions"
		}),
		init
	);

	Callbacks.method(
		meta({
			"name": "add",
			"description": "Adds a callback to the queue",
			"arguments": [{
				"name": "callback",
				"type": "function"
			}]
		}),
		add
	);

	Callbacks.method(
		meta({
			"name": "remove",
			"description": "Removes a callback from the queue",
			"arguments": [{
				"name": "callback",
				"type": "function"
			}]
		}),
		remove
	);

	Callbacks.method(
		meta({
			"name": "empty",
			"description": "Removes all callbacks from the queue",
			"arguments": []
		}),
		empty
	);

	Callbacks.method(
		meta({
			"name": "execute",
			"description": "Executes each callback in the queue",
			"arguments": [{
				"name": "context",
				"type": "any",
				"description": "thisArg within callbacks"
			}, {
				"name": "args",
				"type": "array|object",
				"arguments": "Array of arguments or arguments object to pass to callbacks"
			}]
		}),
		execute
	);

	Callbacks.method(
		meta({
			"name": "abort",
			"description": "Stops execution of remaining callbacks in the queue while queue is executing",
			"arguments": []
		}),
		abort
	);

	Callbacks.method(
		meta({
			"name": "toArray",
			"description": "Create a shallow copy of the internal queue of callbacks",
			"arguments": [],
			"returns": "array"
		}),
		toArray
	);

	Callbacks.method(
		meta({
			"name": "isEmpty",
			"description": "Checks if the callback is empty",
			"arguments": [],
			"returns": "boolean"
		}),
		isEmpty
	);

	Callbacks.method(
		meta({
			"name": "concat",
			"description": "Creates a new Callbacks instance with merged queues",
			"arguments": [{
				"name": "callbacks",
				"type": "object",
				"required": false,
				"repeating": true,
				"description": "Must be Callback instance(s)"
			}],
			"returns": {
				"name": "callbacks",
				"type": "object"
			}
		}),
		concat
	);

	function init () {
		this.queue = [];
		this.invoke(reset);
	}

	function add (callback) {
		this.queue.push(callback);
	}

	function remove (callback) {
		this.queue.remove(callback);
	}

	function empty () {
		this.queue.empty();
	}

	function execute (context, args) {
		this.invoke(reset);
		this.queue.forEach(this.proxy(apply, context, args));
	}

	function abort () {
		this.aborted = true;
	}

	function reset () {
		this.aborted = false;
	}

	function apply (context, args, callback) {
		if (!this.aborted) {
			callback.apply(context, args);
		}
	}

	function toArray () {
		return this.queue.copy();
	}

	function isEmpty () {
		return this.queue.isEmpty();
	}

	function concat () {
		var queues = getQueues(arguments),
			callbacks = new Callbacks();

		callbacks.queue = this.queue.concat.apply(this.queue, queues);

		return callbacks;
	}

	function getQueues (args) {
		return Array.from(args).map(toQueues).filter(whereDefined);
	}

	function toQueues (callbacks) {
		return callbacks && callbacks.queue;
	}

	function whereDefined (item) {
		return type.is.not("undefined", item);
	}

	return Callbacks;
});