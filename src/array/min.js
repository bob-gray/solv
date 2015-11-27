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
			"name": "min",
			"description": "Gets the smallest numeric value in the array",
			"arguments": [],
			"returns": "number"
		}),
		min
	);

	function min () {
		return Math.min.apply(Math, this);
	}
});