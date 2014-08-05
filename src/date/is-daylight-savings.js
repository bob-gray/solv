/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"name": "Date",
		"type": "class",
		"global": true
	})*/

	require("../class/method");
	require("./hours-from-standard");

	var meta = require("../meta");

	Date.method(
		meta({
			"name": "isDaylightSavings",
			"description": "Tests if date is within daylight savings time",
			"arguments": [],
			"returns": "boolean"
		}),
		isDaylightSavings
	);

	function isDaylightSavings () {
		return this.hoursFromStandard() > 0;
	}
});