/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta");

	meta({
		"name": "hoursFromStandard",
		"description": "Calculates the number of hours deviation from standard time. 0 if date is in standard time. A positive integer if in daylight savings time.",
		"arguments": [{
			"name": "date",
			"type": "date|string|number",
			"description": "A date object or a primitive value that represents a date that can be parsed."
		}],
		"returns": "number"
	});

	var hoursFromStandard = hoursFromStandardWithDate.overload("!date", function (dateLike) {
		return hoursFromStandardWithDate(new Date(dateLike));
	});

	function hoursFromStandardWithDate (date) {
		var january = 0,
			july = 6,
			minutesInHour = 60,
			year = date.getFullYear(),
			offset = date.getTimezoneOffset(),
			januaryOffset = new Date(year, january, 1).getTimezoneOffset(),
			julyOffset = new Date(year, july, 1).getTimezoneOffset(),
			standardOffset = Math.max(januaryOffset, julyOffset);


		return (standardOffset - offset) / minutesInHour;
	}

	meta({
		"name": "isLeapYear",
		"description": "Tests if year is leap year",
		"arguments": [{
			"name": "year",
			"type": "number",
			"description": "A full year integer (ie... 1998)"
		}],
		"returns": "boolean"
	});

	function isLeapYear (year) {
		var february = 1,
			leapDay = 29;

		return new Date(year, february, leapDay).getDate() === leapDay;
	}

	meta({
		"name": "isDayLightSavings",
		"description": "Tests if date is within daylight savings time",
		"arguments": [{
			"name": "date",
			"type": "date|string|number",
			"description": "A date object or a primitive value that represents a date that can be parsed."
		}],
		"returns": "boolean"
	});

	function isDayLightSavings (date) {
		return hoursFromStandard(date) > 0;
	}

	return {
		hoursFromStandard: hoursFromStandard,
		isLeapYear: isLeapYear,
		isDayLightSavings: isDayLightSavings,

		JANUARY: 0,
		FEBRUARY: 1,
		MARCH: 2,
		APRIL: 3,
		MAY: 4,
		JUNE: 5,
		JULY: 6,
		AUGUST: 7,
		SEPTEMBER: 8,
		OCTOBER: 9,
		NOVEMBER: 10,
		DECEMBER: 11,

		SUNDAY: 0,
		MONDAY: 1,
		TUESDAY: 2,
		WEDNESDAY: 3,
		THURSDAY: 4,
		FRIDAY: 5,
		SATURDAY: 6,

		MILLISECONDS_IN_SECOND: 1000,
		SECONDS_IN_MINUTE: 60,
		MINUTES_IN_HOUR: 60,
		HOURS_IN_DAY: 24,
		DAYS_IN_WEEK: 7,
		MONTHS_IN_QUARTER: 3,
		MONTHS_IN_YEAR: 12
	};
});