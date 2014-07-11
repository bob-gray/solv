/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/method");

	var meta = require("../meta");

	/*meta({
		"name": "Date",
		"type": "class",
		"global": true
	});*/

	Date.method(
		meta({
			"name": "isLeapYear",
			"static": true,
			"description": "Tests if year is leap year",
			"arguments": [{
				"name": "year",
				"type": "number",
				"description": "A full year integer (ie... 1998)"
			}],
			"returns": "boolean"
		}),
		isLeapYear
	);

	function isLeapYear (year) {
		var february = 1,
			leapDay = 29;

		return new Date(year, february, leapDay).getDate() === leapDay;
	}
});