/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"type": "module",
		"description": "For decorating a class with methods. mixin should be called on a class constructor. ie... MyClass.mixin(...)"
	})

	meta({
		"name": "Function",
		"type": "class",
		"global": true
	})*/

	require("./method");
	require("../function/constrict");
	require("../shim/object");
	require("../shim/array");
	require("../shim/function");
	
	var meta = require("../meta"),
		type = require("../type");

	Function.method(
		meta({
			"type": "method",
			"name": "mixin",
			"description": "Each item in the array will be mixed in.",
			"arguments": [{
				"name": "mixins",
				"type": "array",
				"items": "function|object"
			}],
			"returns": {
				"name": "Class",
				"type": "function",
				"description": "self to allow for chaining"
			}
		}),
		mixinArray
	);

	Function.method(
		meta({
			"type": "method",
			"name": "mixin",
			"description": "OtherClass's own instance methods will be appended directly to function's prototype. This doesn't include OtherClass's inherited methods.",
			"arguments": [{
				"name": "OtherClass",
				"type": "function"
			}],
			"returns": {
				"name": "Class",
				"type": "function",
				"description": "self to allow for chaining"
			}
		}),
		mixinClass
	);

	Function.method(
		meta({
			"type": "method",
			"name": "mixin",
			"description": "Objects own methods will be appended directly to function's prototype",
			"arguments": [{
				"name": "mixins",
				"type": "object"
			}],
			"returns": {
				"name": "Class",
				"type": "function",
				"description": "self to allow for chaining"
			}
		}),
		mixin
	);
	
	function mixinArray (mixins) {
		mixins.forEach(this.mixin.constrict(0, 1), this);
		return this;
	}
	
	function mixinClass (OtherClass) {
		return this.mixin(OtherClass.prototype);
	}

	function mixin (mixins) {
		Object.keys(mixins)
			.filter(isFunction, mixins)
			.forEach(attachMethod.bind(this, mixins));

		return this;
	}

	function isFunction (name) {
		return type.is("function", this[name]);
	}

	function attachMethod (mixins, name) {
		this.prototype[name] = mixins[name];
	}
});
