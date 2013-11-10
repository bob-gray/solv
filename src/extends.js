define(
	[
		"./meta"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "module",
			"export": "Function",
			"description": "Allows one class to easily inherit from another"
		});

		meta({
			"entity": "method",
			"for": "Function",
			"name": "extend",
			"description": "To be called as a method of a class constructor. Wires up a class to inherit from a parent class. Assigns the Parent's prototype to an \"_super\" property of the child's prototype.",
			"arguments": [{
				"name": "Parent",
				"type": "function",
				"description": "Parent class constructor"
			}],
			"return": {
				"type": "function",
				"description": "Child's constructor (the method's owner). This allows chaining."
			}
		});

		Function.prototype.extends = function (Parent) {
			var Child = this,
				Surrogate = createSurrogate(Parent);
			inheritFromSurrogate(Child, Surrogate);
			return Child;
		};

		function createSurrogate (Parent) {
			function Surrogate () {}
			Surrogate.prototype = Parent.prototype;
			return Surrogate;
		}

		function inheritFromSurrogate (Child, Surrogate) {
			Child.prototype = new Surrogate();
			Child.prototype.constructor = Child;
			Child.prototype._super = new Surrogate();
		}
	}
);
