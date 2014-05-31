if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../array/from");
	require("../class/shim");

	var meta = require("../meta");

	meta({
		"name": "Function",
		"type": "class",
		"global": true
	});
	
	meta({
		"name": "curry",
		"shim": true,
		"description": "Higher-order function that returns a proxy that is partially applied (has prefilled arguments)",
		"arguments": [{
			"name": "nArgs",
			"type": "any",
			"required": false,
			"repeating": true
		}],
		"returns": "function"
	});

	Function.shim(curry);
	
	function curry () {
		var fn = this,
			prefill = Array.from(arguments);
		
		return function () {
			var remaining = Array.from(arguments),
				allArgs = prefill.concat(remaining);

			return fn.apply(this, allArgs);
		};
	}
	
	return curry;
});