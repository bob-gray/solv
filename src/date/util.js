/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var DateUtil,
		meta = require("../meta"),
		createClass = require("../class");

	DateUtil = createClass(
		meta({
			"name": "DateUtil",
			"type": "class",
			"description": "Singleton instance is exported and not class constructor",
			"properties": {
				"JANUARY": 0,
				"FEBRUARY": 1,
				"MARCH": 2,
				"APRIL": 3,
				"MAY": 4,
				"JUNE": 5,
				"JULY": 6,
				"AUGUST": 7,
				"SEPTEMBER": 8,
				"OCTOBER": 9,
				"NOVEMBER": 10,
				"DECEMBER": 11,

				"SUNDAY": 0,
				"MONDAY": 1,
				"TUESDAY": 2,
				"WEDNESDAY": 3,
				"THURSDAY": 4,
				"FRIDAY": 5,
				"SATURDAY": 6,

				"MILLISECONDS_IN_SECOND": 1000,
				"SECONDS_IN_MINUTE": 60,
				"MINUTES_IN_HOUR": 60,
				"HOURS_IN_DAY": 24,
				"DAYS_IN_WEEK": 7,
				"MONTHS_IN_QUARTER": 3,
				"MONTHS_IN_YEAR": 12,

				"NOON": 12,
				"MIDNIGHT": 12,

				"WEEKDAYS": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				"MONTHS": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
			}
		})
	);

	DateUtil.method(
		meta({
			"name": "hoursFromStandard",
			"description": "Calculates the number of hours deviation from standard time. 0 if date is in standard time. A positive integer if in daylight savings time.",
			"arguments": [{
				"name": "date",
				"type": "date|string|number",
				"description": "A date object or a primitive value that represents a date that can be parsed."
			}],
			"returns": "number"
		}),
		hoursFromStandard
	);

	// overload
	DateUtil.method({name:"hoursFromStandard", signature:"!date"}, hoursFromStandardDateLike);

	DateUtil.method(
		meta({
			"name": "isLeapYear",
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

	DateUtil.method(
		meta({
			"name": "isDaylightSavings",
			"description": "Tests if date is within daylight savings time",
			"arguments": [{
				"name": "date",
				"type": "date|string|number",
				"description": "A date object or a primitive value that represents a date that can be parsed."
			}],
			"returns": "boolean"
		}),
		isDaylightSavings
	);

	function hoursFromStandard (date) {
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

	function hoursFromStandardDateLike (dateLike) {
		return hoursFromStandard(new Date(dateLike));
	}

	function isLeapYear (year) {
		var february = 1,
			leapDay = 29;

		return new Date(year, february, leapDay).getDate() === leapDay;
	}

	function isDaylightSavings (date) {
		// could call this.hoursFromStandard but calling from prototype
		// makes isDaylightSavings safe to be removed from context
		return DateUtil.prototype.hoursFromStandard(date) > 0;
	}

	return DateUtil.singleton();
});