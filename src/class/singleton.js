define(
	[
		"solv/meta",
		"solv/shim/function",
		"solv/array/from",
		"solv/class/shim"
	],
	function (meta) {
		"use strict";

		meta({
			"type": "module",
			"export": "Function.prototype.singleton"
		});

		meta({
			"name": "Function",
			"type": "class",
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
		
		Function.shim(singleton);
		
		function singleton () {
			var args,
				ignoredContext = {};
			
			if (!this.instance) {
				args = Array.from(arguments);
				args.unshift(ignoredContext);
				this.instance = new (this.bind.apply(this, args))();
			}
			return this.instance;
		}

		return singleton;
	}
);

