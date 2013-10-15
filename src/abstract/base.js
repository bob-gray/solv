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
				"entity": "class",
				"name": "Base",
				"description": "Abstract class."
			})
		);

		Base.method(
			meta({
				"name": "invoke",
				"description": "Useful for invoking local functions as private methods.",
				"arguments": [{
					"type": "function",
					"name": "fn"
				}, {
					"type": "any",
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
				"description": "Creates a function bound to this; useful for attaching event listeners.",
				"arguments": [{
					"type": "function",
					"name": "fn",
					"description": "Any function in scope. Doesn't need to be a public method."
				}, {
					"type": "any",
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
				"description": "Creates a function bound to this; useful for attaching event listeners.",
				"arguments": [{
					"type": "string",
					"name": "method",
					"description": "The name of the method to bind."
				}, {
					"type": "any",
					"required": false,
					"repeating": true
				}],
				"returns": "function"
			}),
			proxyMethod
		);

		Base.prototype._super = {};

		function invokeFunction (fn) {
			var args = Array.fromArguments(arguments).slice(1);
			return fn.apply(this, args);
		}

		function proxyMethod (method) {
			var args = Array.fromArguments(arguments),
				fn = this[method];
			args.splice(0, 1, this);
			return fn.bind.apply(fn, args);
		}

		function proxyFunction (fn) {
			var args = Array.fromArguments(arguments);
			args.splice(0, 1, this);
			return fn.bind.apply(fn, args);
		}

		return Base;
	}
);