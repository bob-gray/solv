define(
	[
		"../meta",
		"../shim/object"
	],
	function (meta) {
		"use strict";

		meta({
			"type": "module",
			"exports": "extend",
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
			"description": "To be called as a method of a class constructor. Wires up a class to inherit from a super class. Assigns Super as a static property of child class.",
			"arguments": [{
				"name": "Super",
				"type": "function",
				"description": "Super class constructor"
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
