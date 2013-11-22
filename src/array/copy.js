define(
	[
		"solv/meta",
		"solv/array/from",
		"solv/class/shim"
	],
	function (meta, from) {
		"use strict";

		meta({
			"name": "Array",
			"type": "class",
			"global": true
		});

		meta({
			"name": "copy",
			"static": true,
			"shim": true,
			"description": "Creates a shallow copy of an array",
			"arguments": [{
				"name": "array",
				"type": "array"
			}],
			"returns": "array"
		});
	
		Array.shimStatic("copy", from);
		
		return from;
	}
);