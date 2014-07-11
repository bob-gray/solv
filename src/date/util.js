/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../shim/array");

	var dateUtil = {
		MILLISECONDS_IN_SECOND: 1000,
		SECONDS_IN_MINUTE: 60,
		MINUTES_IN_HOUR: 60,
		HOURS_IN_DAY: 24,
		DAYS_IN_WEEK: 7,
		MONTHS_IN_QUARTER: 3,
		MONTHS_IN_YEAR: 12,
		NOON: 12,
		MIDNIGHT: 12,
		WEEKDAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		MONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	};

	dateUtil.WEEKDAYS.forEach(createConstant);
	dateUtil.MONTHS.forEach(createConstant);

	function createConstant (name, index) {
		dateUtil[name.toUpperCase()] = index;
	}

	return dateUtil;
});