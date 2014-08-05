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

	var meta = require("../meta"),
		dateUtil = require("./util");

	Date.method(
		meta({
			"name": "hoursFromStandard",
			"description": "Calculates the number of hours deviation from standard time. 0 if date is in standard time. A positive integer if in daylight savings time.",
			"arguments": [],
			"returns": "number"
		}),
		hoursFromStandard
	);

	function hoursFromStandard () {
		var offset = this.getTimezoneOffset(),
			year = this.getFullYear(),
			jan1 = new Date(year, dateUtil.JANUARY, 1),
			januaryOffset = jan1.getTimezoneOffset(),
			july1 = new Date(year, dateUtil.JULY, 1),
			julyOffset = july1.getTimezoneOffset(),
			standardOffset = Math.max(januaryOffset, julyOffset);

		return (standardOffset - offset) / dateUtil.MINUTES_IN_HOUR;
	}
});