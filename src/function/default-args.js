define(
	[
		"../meta",
		"../class/shim",
		"../object/merge",
		"../array/from"
	],
	function (meta) {
		"use strict";
		
		meta({
			"name": "Function",
			"type": "class",
			"global": true
		});
		
		meta({
			"name": "defaultArgs",
			"shim": true,
			"description": "A higher order function that returns a new function that will call the original filling in default arguments where arguments are missing",
			"arguments": [{
				"name": "nArgs",
				"type": "any",
				"description": "Default values by argument position"
			}],
			"returns": "any"
		});
		
		Function.shim(defaultArgs);
		
		function defaultArgs () {
			var fn = this,
				defaults = Array.from(arguments);
			
			return function () {
				var args = Array.from(arguments),
					defaultFilled = Object.merge.deep([], defaults, args);
				
				return fn.apply(this, defaultFilled);
			};
		}
	}
);