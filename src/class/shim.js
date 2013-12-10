if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../function/get-name");

	var meta = require("../meta");
	
	meta({
		"name": "Function",
		"type": "class",
		"global": true
	});
	
	meta({
		"name": "shim",
		"description": "Attaches an instance method only if it doesn't already exist",
		"arguments": [{
			"name": "name",
			"type": "string",
			"description": "If name is not passed it will be retrieved with implementation.getName()",
			"required": false
		}, {
			"name": "implementation",
			"type": "function"
		}],
		"returns": {
			"type": "function",
			"description": "Class constructor shim was called from. This allows chaining."
		}
	});
	
	meta({
		"name": "shimStatic",
		"description": "Attaches a static method only if it doesn't already exist",
		"arguments": [{
			"name": "name",
			"type": "string",
			"description": "If name is not passed it will be retrieved with implementation.getName()",
			"required": false
		}, {
			"name": "implementation",
			"type": "function"
		}],
		"returns": {
			"type": "function",
			"description": "Class constructor shim was called from. This allows chaining."
		}
	});
	
	shim.call(Function, shim);
	Function.shim(shimStatic);
	
	function shim (name, implementation) {
		attachIfUndefined(this.prototype, name, implementation);
		return this;
	}
	
	function shimStatic (name, implementation) {
		attachIfUndefined(this, name, implementation);
		return this;
	}
	
	function attachIfUndefined (target, name, implementation) {
		if (!arguments[2]) {
			implementation = arguments[1];
			name = implementation.getName();
		}
	
		if (!target[name]) {
			target[name] = implementation;
		}
	}
	
	return shim;
});