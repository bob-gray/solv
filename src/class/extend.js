define(
	[
		"../meta",
		"../shim/object"
	],
	function (meta) {
		"use strict";

		meta({
			"type": "module",
			"export": "extend",
			"description": "Allows one class to easily inherit from another"
		});

		meta({
			"name": "Function",
			"type": "class",
			"global": true
		});

		meta({
			"name": "extend",
			"static": true,
			"description": "To be called as a method of a class constructor. Wires up a class to inherit from a parent class. Assigns the Parent's prototype to an \"_super\" property of the child's prototype.",
			"arguments": [{
				"name": "Parent",
				"type": "function",
				"description": "Parent class constructor"
			}],
			"returns": {
				"type": "function",
				"description": "Child's constructor (the method's owner). This allows chaining."
			}
		});

		function extend (Super) {
			this.prototype = Object.create(Super.prototype);
			this.prototype.constructor = this;
			this.Super = Super;
			return this;
		}

		if (!Function.prototype.extend) {
			Function.prototype.extend = extend;
		}

		return extend;
	}
);
