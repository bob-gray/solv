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

	var meta = require("../meta");

	Array.method(
		meta({
			"name": "first",
			"description": "Gets the first item in array",
			"arguments": [],
			"returns": "any"
		}),
		first
	);

	function first () {
		return this[0];
	}
});