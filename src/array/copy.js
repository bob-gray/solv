/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/shim");

	var meta = require("../meta"),
		from = require("../array/from");

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
});