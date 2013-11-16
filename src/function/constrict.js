define(
	[
		"../meta",
		"../shim/array"
	],
	function (meta) {
		"use strict";
		
		meta({
			"name": "Function",
			"type": "class",
			"global": true
		});
		
		meta({
			"name": "constrict",
			"description": "Higher order function that returns a proxy which slices arguments passed to original function",
			"arguments": [{
				"name": "begin",
				"type": "number",
				"required": false
			}, {
				"name": "end",
				"type": "number",
				"required": false
			}],
			"returns": "function"
		});

		Function.prototype.constrict = function (begin, end) {
			var fn = this;
			return function () {
				var constricted = Array.from(arguments).slice(begin, end);
				return fn.apply(this, constricted);
			};
		};
	}
);