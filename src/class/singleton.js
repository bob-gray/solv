define(
	[
		"../meta",
		"../shim/function",
		"../shim/array"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "module",
			"export": "Function.prototype.singleton",
			"description": ""
		});

		meta({
			"entity": "class",
			"name": "Function",
			"global": true
		});

		meta({
			"name": "singleton",
			"description": "To be called as a method of a class constructor. Useful creating and retrieving a singleton instance of a class.",
			"arguments": [{
				"name": "constructorArgs",
				"type": "any",
				"description": "All arguments are ignored is instance already exists or passed to the constructor to build the singleton instance.",
				"required": false,
				"repeating": true
			}],
			"return": {
				"description": "Singleton instance"
			}
		});

		if (!Function.prototype.singleton) {
			Function.prototype.singleton = function () {
				var args,
					ignoredContext = {};
				if (!this.instance) {
					args = Array.from(arguments);
					args.unshift(ignoredContext);
					this.instance = new (this.bind.apply(this, args))();
				}
				return this.instance;
			};
		}

		return Function.prototype.singleton;
	}
);

