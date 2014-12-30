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
			"name": "average",
			"description": "Calcuates the average of the values in the array",
			"arguments": [],
			"returns": "number"
		}),
		average
	);

	function average () {
		var avg = 0;

		if (this.length) {
			avg = this.sum() / this.length;
		}

		return avg;
	}
});