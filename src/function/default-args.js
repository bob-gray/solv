/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/shim");
	require("../object/merge");
	require("../array/from");

	var meta = require("../meta"),
		type = require("../type");

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
			var args = Array.from(arguments).reduce(split, {
					withoutDefaults: [],
					withDefaults: []
				}),
				defaultFilled = Object.merge.deep(
					args.withoutDefaults,
					defaults,
					args.withDefaults
				);
			
			return fn.apply(this, defaultFilled);
		};

		function split (args, arg, index) {
			if (type.is("undefined", defaults[index])) {
				args.withoutDefaults[index] = arg;

			} else {
				args.withDefaults[index] = arg;
			}

			return args;
		}
	}
});