define(
	[
		"../meta",
		"../class/method",
		"./from"
	],
	function (meta) {
		"use strict";

		meta({
			"name": "Array",
			"type": "class",
			"global": true
		});

		meta({
			"name": "of",
			"static": true,
			"shim": true,
			"description": "Creates an array of the arguments passed to it",
			"arguments": [{
				"name": "item",
				"type": "any",
				"required": false,
				"repeating": true
			}],
			"returns": "array"
		});
		
		Array.shimStatic(of);
		
		function of () {
			return this.from(arguments);
		}
		
		return of;
	}
);