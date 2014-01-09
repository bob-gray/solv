if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../shim/function");
	require("../array/from");

	var meta = require("../meta"),
		createClass = require("../class");
	
	var Base = createClass(
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
				"description": "All additional arguments are forwarded to fn as preceeding arguments"
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
				"description": "All additional arguments are forwarded to fn as preceeding arguments"
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
				"description": "All additional arguments are forwarded to the method as preceeding arguments"
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
				"description": "All additional arguments are forwarded to the method as preceeding arguments"
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
				"description": "All additional arguments are forwarded to the method as preceeding arguments"
			}]
		}),
		delayBy
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

	return Base;
});