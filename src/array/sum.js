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
			"name": "sum",
			"description": "Sum of values in the array",
			"arguments": [],
			"returns": "number"
		}),
		sum
	);

	function sum () {
		return this.reduce(total, 0);
	}

	function total (sum, value) {
		return +value + sum;
	}
});