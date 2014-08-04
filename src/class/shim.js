/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"name": "Function",
		"type": "class",
		"global": true
	})
	
	meta({
		"name": "shim",
		"description": "Attaches an instance method only if it doesn't already exist",
		"arguments": [{
			"name": "name",
			"type": "string",
			"description": "Name of method"
		}, {
			"name": "implementation",
			"type": "function"
		}],
		"returns": {
			"type": "function",
			"description": "self to allow for chaining"
		}
	})
	
	meta({
		"name": "shimStatic",
		"description": "Attaches a static method only if it doesn't already exist",
		"arguments": [{
			"name": "name",
			"type": "string",
			"description": "If name is not passed it will be retrieved with implementation.getName()"
		}, {
			"name": "implementation",
			"type": "function"
		}],
		"returns": {
			"type": "function",
			"description": "self to allow for chaining"
		}
	})*/
	
	Function.prototype.shim = shim;
	Function.prototype.shimStatic = shimStatic;
	
	function shim (name, implementation) {
		attachIfUndefined(this.prototype, name, implementation);

		return this;
	}
	
	function shimStatic (name, implementation) {
		attachIfUndefined(this, name, implementation);

		return this;
	}
	
	function attachIfUndefined (target, name, implementation) {
		if (!target[name]) {
			target[name] = implementation;
		}
	}
});