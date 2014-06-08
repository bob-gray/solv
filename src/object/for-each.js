/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/shim");
	require("../shim/array");

	var meta = require("../meta");

	meta({
		"name": "Object",
		"type": "class",
		"global": true
	});

	meta({
		"name": "forEach",
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
	
	Object.shimStatic(forEach);
	
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
});