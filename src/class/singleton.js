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
		"name": "singleton",
		"description": "To be called as a method of a class constructor. Useful creating and retrieving a singleton instance of a class.",
		"arguments": [{
			"name": "constructorArgs",
			"type": "any",
			"required": false,
			"repeating": true,
			"description": "All arguments are ignored if instance already exists. If instance doesn't exist arguments are passed to the constructor to build the singleton instance."
		}],
		"returns": {
			"description": "Singleton instance"
		}
	})*/

	require("../shim/function");
	require("../array/from");
	
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
});