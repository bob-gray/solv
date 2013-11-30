define(
	[
		"../meta",
		"../class/shim",
		"../shim/array"
	],
	function () {
		"use strict";
		
		meta({
			"name": "forEach",
			"type": "method",
			"static": true,
			"description": "Iterates over an objects own properties",
			"arguments": [{
				"name": "object",
				"type": "object"
			}, {
				"name": "callback",
				"type": "function",
				"description": "Invoked once per own property with the signature (value, key, object)"
			}, {
				"name": "context",
				"type": "object",
				"required": false,
				"description": "'this' inside callback - defaults to object argument"
			}]
		});
		
		Object.staticShim(forEach);
		
		function forEach (object, callback, context) {
			var keys = Object.keys(object);
			
			if (!context) {
				context = object;
			}
			
			keys.forEach(invoke.bind(context, object, callback));
		}
		
		function invoke (object, callback, key) {
			callback.call(this, object[key], key, object);
		}
	}
);