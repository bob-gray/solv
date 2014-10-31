/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../shim/function");
	require("../array/from");
	require("../function/debounce");

	var Base,
		meta = require("../meta"),
		createClass = require("../class");

	Base = createClass(
		meta({
			"name": "Base",
			"type": "class",
			"description": "General purpose base class"
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
				"required": false,
				"repeating": true,
				"description": "All additional arguments are forwarded to fn as preceding arguments"
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
				"description": "Useful for invoking private function objects as methods of the instance"
			}, {
				"name": "nArgs",
				"type": "any",
				"required": false,
				"repeating": true,
				"description": "All additional arguments are forwarded to fn as preceding arguments"
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
			"description": "Creates a function bound to the instance where method is the name of an instance method",
			"arguments": [{
				"name": "method",
				"type": "string",
				"description": "The name of the method to bind"
			}, {
				"name": "nArgs",
				"type": "any",
				"required": false,
				"repeating": true,
				"description": "All additional arguments are forwarded to the method as preceding arguments"
			}],
			"returns": {
				"type": "function",
				"description": "instance.method bound to instance"
			}
		}),
		proxyMethod
	);

	Base.method(
		meta({
			"name": "delay",
			"description": "Invokes a method asynchronously",
			"arguments": [{
				"name": "method",
				"type": "string|function",
				"description": "The name of the method to bind or a function object to be bound"
			}, {
				"name": "nArgs",
				"type": "any",
				"required": false,
				"repeating": true,
				"description": "All additional arguments are forwarded to the method as preceding arguments"
			}]
		}),
		delay
	);

	Base.method(
		meta({
			"name": "delay",
			"description": "Invokes a method asynchronously after a given delay",
			"arguments": [{
				"name": "wait",
				"type": "number",
				"description": "Milliseconds to wait before invoking method"
			}, {
				"name": "method",
				"type": "string|function",
				"description": "The name of the method to bind or a function object to be bound."
			}, {
				"name": "nArgs",
				"type": "any",
				"required": false,
				"repeating": true,
				"description": "All additional arguments are forwarded to the method as preceding arguments"
			}]
		}),
		delayBy
	);

	Base.method(
		meta({
			"name": "debounce",
			"description": "Creates a function bound to the instance that postpones execution until a lapse of n milliseconds",
			"arguments": [{
				"name": "fn",
				"type": "function"
			}, {
				"name": "lapse",
				"type": "number",
				"required": true
			}, {
				"name": "leading",
				"type": "boolean",
				"description": "If true executes on the leading edge of lapse. Otherwise on the trailing end.",
				"default": false
			}],
			"returns": "function"
		}),
		debounceFunction
	);

	Base.method(
		meta({
			"name": "debounce",
			"description": "Creates a function bound to the instance that postpones execution until a lapse of n milliseconds",
			"arguments": [{
				"name": "method",
				"type": "string",
				"description": "The name of the method to debounce"
			}, {
				"name": "lapse",
				"type": "number",
				"required": true
			}, {
				"name": "leading",
				"type": "boolean",
				"description": "If true executes on the leading edge of lapse. Otherwise on the trailing end.",
				"default": false
			}],
			"returns": "function"
		}),
		debounceMethod
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

	function delay (method) {
		setTimeout(this.proxy.apply(this, arguments), 0);
	}

	function delayBy (wait, method) {
		var args = Array.from(arguments);

		args.shift();

		setTimeout(this.proxy.apply(this, args), wait);
	}

	function debounceFunction (fn, lapse, leading) {
		return fn.bind(this).debounce(lapse, leading);
	}

	function debounceMethod (method, lapse, leading) {
		return this[method].bind(this).debounce(lapse, leading);
	}

	return Base;
});