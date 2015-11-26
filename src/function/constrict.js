/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../array/from");
	require("../class/method");

	var meta = require("../meta"),
		type = require("../type");

	/*meta({
		"name": "Function",
		"type": "class",
		"global": true
	})*/
	
	Function.method(
		meta({
			"name": "constrict",
			"description": "Higher-order function that returns a proxy which slices arguments passed to original function",
			"arguments": [{
				"name": "begin",
				"type": "number"
			}, {
				"name": "end",
				"type": "number",
				"required": false
			}],
			"returns": "function"
		}),
		constrict
	);
	
	Function.method(
		{
			"name": "constrict",
			"arguments": []
		},
		fullConstrict
	);

	function fullConstrict () {
		return this.constrict(0, 0);
	}

	function constrict (begin, end) {
		var fn = this,
			noEnd = type.is("undefined", end);
		
		return function () {
			var constricted;
			
			if (noEnd) {
				end = arguments.length;
			}
			
			constricted = Array.from(arguments).slice(begin, end);

			return fn.apply(this, constricted);
		};
	}
	
	return constrict;
});