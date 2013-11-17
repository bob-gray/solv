define(
	[
		"../meta"
	],
	function (meta) {
		"use strict";

		meta({
			"name": "Array",
			"type": "class",
			"global": true
		});

		meta({
			"name": "from",
			"static": true,
			"description": "Gets a real array from an array-like object",
			"arguments": [{
				"name": "arrayLike",
				"type": "object",
				"description": "Any object with a length property and indexed values; such as arguments"
			}],
			"returns": "array"
		});
	
		if (!Array.prototype.from) {
			Array.from = from;
		}
		
		function from (arrayLike) {
			return this.prototype.slice.call(arrayLike);
		}
		
		return from;
	}
);