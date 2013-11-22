define(
	[
		"solv/meta",
		"solv/class",
		"solv/shim/function",
		"solv/array/from"
	],
	function (meta, createClass) {
		"use strict";

		var Base = createClass(
			meta({
				"name": "Base",
				"type": "class",
				"description": "General abstract class"
			})
		);

		Base.method(
			meta({
				"name": "invoke",
				"description": "Useful for invoking local functions as private methods",
				"arguments": [{
					"name": "fn",
					"type": "function",
					"description": "Invoked as a method of the instance"
				}, {
					"name": "nArgs",
					"type": "any",
					"description": "All additional arguments are forwarded to fn",
					"required": false,
					"repeating": true
				}],
				"returns": {
					"name": "result",
					"type": "any",
					"description": "Return from fn"
				}
			}),
			invokeFunction
		);

		Base.method(
			meta({
				"name": "proxy",
				"description": "Creates a function bound to the instance; useful for creating bound callbacks",
				"arguments": [{
					"name": "fn",
					"type": "function",
					"description": "Useful for private functions. Invoked as method of the instance"
				}, {
					"name": "nArgs",
					"type": "any",
					"description": "All additional arguments are forwarded to fn as preceeding arguments",
					"required": false,
					"repeating": true
				}],
				"returns": {
					"type": "function",
					"description": "fn bound the instance"
				}
			}),
			proxyFunction
		);

		Base.method(
			meta({
				"name": "proxy",
				"description": "Creates a function bound the instance where method is the name of an instance method",
				"arguments": [{
					"name": "method",
					"type": "string",
					"description": "The name of the method to bind."
				}, {
					"name": "nArgs",
					"type": "any",
					"description": "All additional arguments are forwarded to the method as preceeding arguments",
					"required": false,
					"repeating": true
				}],
				"returns": {
					"type": "function",
					"description": "instance.method bound to instance"
				}
			}),
			proxyMethod
		);

		function invokeFunction (fn) {
			var args = Array.from(arguments);
			args.shift();
			return fn.apply(this, args);
		}

		function proxyFunction (fn) {
			var args = Array.from(arguments);
			args.splice(0, 1, this);
			return fn.bind.apply(fn, args);
		}

		function proxyMethod (method) {
			var args = Array.from(arguments),
				fn = this[method];
			args.splice(0, 1, this);
			return fn.bind.apply(fn, args);
		}

		return Base;
	}
);