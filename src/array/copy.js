/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"name": "Array",
		"type": "class",
		"global": true
	})*/

	require("../class/method");
	require("../array/from");

	var meta = require("../meta");

	Array.method(
		meta({
			"name": "copy",
			"static": true,
			"description": "Creates a shallow copy of an array",
			"arguments": [{
				"name": "array",
				"type": "array"
			}],
			"returns": "array"
		}),
		Array.from
	);

	Array.method(
		meta({
			"name": "copy",
			"description": "Creates a shallow copy of array",
			"arguments": [],
			"returns": "array"
		}),
		copy
	);

	function copy () {
		return Array.from(this);
	}
});