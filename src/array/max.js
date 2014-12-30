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
			"name": "max",
			"description": "Gets the largest numeric value in the array",
			"arguments": [],
			"returns": "number"
		}),
		max
	);

	function max () {
		return Math.max.apply(Math, this);
	}
});