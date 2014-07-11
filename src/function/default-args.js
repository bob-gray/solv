/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/shim");
	require("../object/merge");
	require("../array/from");

	var meta = require("../meta");

	meta({
		"name": "Function",
		"type": "class",
		"global": true
	});
	
	meta({
		"name": "defaultArgs",
		"shim": true,
		"description": "A higher order function that returns a new function that will call the original filling in default arguments where arguments are incomplete",
		"arguments": [{
			"name": "nArgs",
			"type": "any",
			"description": "Default values by argument position. Objects are merged. Arrays are not."
		}],
		"returns": "any"
	});
	
	Function.shim("defaultArgs", defaultArgs);
	
	function defaultArgs () {
		var fn = this,
			defaults = Array.from(arguments);
		
		return function () {
			var args = Array.from(arguments),
				defaultFilled = Object.merge.deep([], defaults, args);
			
			return fn.apply(this, defaultFilled);
		};
	}
});