/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/method");

	var meta = require("../meta"),
		from = require("../array/from");

	/*meta({
		"name": "Array",
		"type": "class",
		"global": true
	});*/

	Array.method(
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
		}),
		from
	);

	Array.method(
		meta({
			"name": "copy",
			"shim": true,
			"description": "Creates a shallow copy of an array",
			"arguments": [],
			"returns": "array"
		}),
		copy
	);

	function copy () {
		return Array.from(this);
	}
});