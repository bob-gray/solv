define(
	[
		"../meta",
		"../class",
		"../shim/function",
		"../shim/array"
	],
	function (meta, createClass) {
		"use strict";

		var Base = createClass(
			meta({
				"name": "Base",
				"type": "class",
				"description": "Abstract class"
			})
		);

		Base.method(
			meta({
				"name": "invoke",
				"description": "Useful for invoking local functions as private methods.",
				"arguments": [{
					"name": "fn",
					"type": "function",
					"description": "Invoked as a method of the instance."
				}, {
					"name": "additionalArgs",
					"type": "any",
					"description": "All additional arguments are forwarded to fn.",
					"required": false,
					"repeating": true
				}],
				"returns": "any"
			}),
			invokeFunction
		);

		Base.method(
			meta({
				"name": "proxy",
				"description": "Creates a function bound to this; useful for creating bound callbacks.",
				"arguments": [{
					"name": "fn",
					"type": "function",
					"description": "Useful for private functions. Invoked as method of the instance."
				}, {
					"name": "additionalArgs",
					"type": "any",
					"description": "All additional arguments are forwarded to fn as preceeding arguments.",
					"required": false,
					"repeating": true
				}],
				"returns": "function"
			}),
			proxyFunction
		);

		Base.method(
			meta({
				"name": "proxy",
				"arguments": [{
					"name": "method",
					"type": "string",
					"description": "The name of the method to bind."
				}, {
					"name": "additionalArgs",
					"type": "any",
					"description": "All additional arguments are forwarded to the method as preceeding arguments.",
					"required": false,
					"repeating": true
				}],
				"returns": "function"
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