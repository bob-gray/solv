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
		"name": "extend",
		"static": true,
		"description": "Allows one class to easily inherit from another. To be called as a method of a class constructor. Wires up a class to inherit from a super class. Assigns Super as a static property of child class.",
		"arguments": [{
			"name": "Super",
			"type": "function",
			"description": "Super class constructor"
		}],
		"returns": {
			"type": "function",
			"description": "Child's constructor (the method's owner). This allows chaining."
		}
	})*/

	require("../shim/object");

	Function.prototype.extend = function (Super) {
		this.prototype = Object.create(Super.prototype);
		this.prototype.constructor = this;
		this.Super = Super;

		return this;
	};
});