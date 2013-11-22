define(
	[
		"solv/meta",
		"solv/class",
		"solv/abstract/base",
		"solv/shim/array",
		"solv/array/remove",
		"solv/array/copy"
	],
	function (meta, createClass) {
		"use strict";
		
		var Callbacks = createClass(
			meta({
				"name": "Callbacks",
				"type": "class",
				"description": "A queue of callback functions",
				"extends": "solv/abstract/base"
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
				"description": "Stops execution of remaining callbacks in the queue during execute",
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
		
		function init () {
			this.empty();
			this.invoke(reset);
		}
		
		function add (callback) {
			this.queue.push(callback);
		}
		
		function remove (callback) {
			this.queue.remove(callback);
		}
		
		function empty () {
			this.queue = [];
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
			return Array.copy(this.queue);
		}
		
		function isEmpty () {
			return 0 === this.queue.length;
		}
		
		return Callbacks;
	}
);











