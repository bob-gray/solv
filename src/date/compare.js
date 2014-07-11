/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/method");

	var meta = require("../meta"),
		util = require("./util");

	meta({
		"name": "Date",
		"type": "class",
		"global": true
	});

	Date.method(
		meta({
			"name": "compare",
			"arguments": [{
				"name": "other",
				"type": "date|string|number",
				"description": "Date to compare to."
			}, {
				"name": "part",
				"type": "string",
				"description": "The part of the date to compare. See Date Part."
			}],
			"returns": {
				"type": "number",
				"description": "Positive or negative integer value of the difference between the dates."
			}
		}),
		compare
	);

	// overload
	Date.method({name:"compare", signature:"!date,string"}, compareDateLike);

	meta({
		"name": "Date Part",
		"type": "Specification",
		"d": "day",
		"m": "month",
		"y": "year",
		"q": "quarter",
		"w": "week",
		"h": "hour",
		"M": "minute",
		"s": "second",
		"l": "millisecond"
	});

	var MILLISECONDS_IN_MINUTE = util.SECONDS_IN_MINUTE * util.MILLISECONDS_IN_SECOND,
		MILLISECONDS_IN_DAY = MILLISECONDS_IN_MINUTE * util.MINUTES_IN_HOUR * util.HOURS_IN_DAY,
		comparers;

	function compare (date2, part) {
		return comparers[part](this, date2, part);
	}

	function compareDateLike (dateLike, part) {
		return this.compare(new Date(dateLike), part);
	}

	comparers = {
		"l": function (date1, date2) {
			return date2 - date1;
		},

		"s": function (date1, date2) {
			var minutesDiff = this.M(date1, date2),
				secondsDiff = date2.getSeconds() - date1.getSeconds();

			return minutesDiff * util.SECONDS_IN_MINUTE + secondsDiff;
		},

		"M": function (date1, date2) {
			var hoursDiff = this.h(date1, date2),
				minutesDiff = date2.getMinutes() - date1.getMinutes();

			return hoursDiff * util.MINUTES_IN_HOUR + minutesDiff;
		},

		"h": function (date1, date2) {
			var daysDiff = this.d(date1, date2),
				hoursDiff = date2.getHours() - date1.getHours();

			return daysDiff * util.HOURS_IN_DAY + hoursDiff;
		},

		"d": function (date1, date2) {
			var offset = (date2.getTimezoneOffset() - date1.getTimezoneOffset()) * MILLISECONDS_IN_MINUTE,
				day1 = new Date(date1).setHours(0, 0, 0, 0),
				day2 = new Date(date2).setHours(0, 0, 0, 0);

			return Math.floor((day2 - day1 + offset) / MILLISECONDS_IN_DAY);
		},

		"w": function (date1, date2) {
			return Math.floor(this.d(date1, date2) / util.DAYS_IN_WEEK);
		},

		"m": function (date1, date2) {
			return this.y(date1, date2) * util.MONTHS_IN_YEAR + date2.getMonth() - date1.getMonth();
		},

		"q": function (date1, date2) {
			return Math.floor(this.m(date1, date2) / util.MONTHS_IN_QUARTER);
		},

		"y": function (date1, date2) {
			return date2.getFullYear() - date1.getFullYear();
		}
	};	
});