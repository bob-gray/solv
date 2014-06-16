/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta"),
		type = require("../type");

	meta({
		"name": "Date",
		"type": "class",
		"global": true
	});

	meta({
		"name": "format",
		"arguments": [{
			"name": "mask",
			"type": "string",
			"description": "Can be a custom mask or a stock mask. See Date Mask."
		}, {
			"name": "utc",
			"type": "boolean",
			"required": false,
			"default": false,
			"description": "Whether to format the date using universal time. If false date is formatted using local time."
		}],
		"returns": "string"
	});

	meta({
		"name": "Date Mask",
		"type": "Specification",
		"description": "A date mask is a string containing placeholders that represent parts of a date. Any characters that isn't a placeholder will remain. All characters can be escaped by them within single or double quotes.",
		"Placeholders": {
			"d": "Day of the month",
			"dd": "Day of the month (padded)",
			"ddd": "Weekday name (abbreviated)",
			"dddd": "Weekday name",
			"m": "Month number",
			"mm": "Month number (padded)",
			"mmm": "Month name (abbreviated)",
			"mmmm": "Month name",
			"yy": "Year (2 digits)",
			"yyyy": "Year",
			"h": "Hour",
			"hh": "Hour (padded)",
			"H": "Hour (24 hour)",
			"HH": "Hour (padded 24 hour)",
			"M": "Minute",
			"MM": "Minute (padded)",
			"s": "Second",
			"ss": "Second (padded)",
			"l": "Millisecond",
			"L": "Millisecond (padded)",
			"t": "a or p",
			"tt": "am or pm",
			"T": "A or P",
			"TT": "AM or PM",
			"z": "Time zone (first name)",
			"zz": "Time zone",
			"Z": "Time zone (abbreviated)",
			"r": "Day of month ordinal indicator (st, nd, rd, th)"
		},
		"Stock Masks": {
			"short_date": "m/d/yy",
			"medium_date": "mmm d, yyyy",
			"long_date": "mmmm d, yyyy",
			"full_date": "dddd, mmmm d, yyyy",
			"short_time": "h:MMt",
			"medium_time": "h:MM:ss TT",
			"long_time": "h:MM:ss TT Z",
			"iso_date": "yyyy-mm-dd",
			"iso_time": "HH:MM:ss",
			"iso_datetime": "yyyy-mm-dd\"T\"HH:MM:ss"
		}
	});

	var DateProto = Date.prototype,
		NOON = 12,
		MIDNIGHT = 12,
		weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		stockMasks = {
			short_date: "m/d/yy",
			medium_date: "mmm d, yyyy",
			long_date: "mmmm d, yyyy",
			full_date: "dddd, mmmm d, yyyy",
			short_time: "h:MMt",
			medium_time: "h:MM:ss TT",
			long_time: "HH:MM:ss.L",
			iso_date: "yyyy-mm-dd",
			iso_time: "HH:MM:ss",
			iso_datetime: "yyyy-mm-dd\"T\"HH:MM:ss"
		},
		gettersLocal = {
			getDate: DateProto.getDate,
			getDay: DateProto.getDay,
			getMonth: DateProto.getMonth,
			getFullYear: DateProto.getFullYear,
			getMilliseconds: DateProto.getMilliseconds,
			getSeconds: DateProto.getSeconds,
			getMinutes: DateProto.getMinutes,
			getHours: DateProto.getHours
		},
		gettersUTC = {
			getDate: DateProto.getUTCDate,
			getDay: DateProto.getUTCDay,
			getMonth: DateProto.getUTCMonth,
			getFullYear: DateProto.getUTCFullYear,
			getMilliseconds: DateProto.getUTCMilliseconds,
			getSeconds: DateProto.getUTCSeconds,
			getMinutes: DateProto.getUTCMinutes,
			getHours: DateProto.getUTCHours

		},
		getters = gettersLocal,
		maskParts = /("|')(.*?)\1|d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTtz])\3?|[LlrZ]/g,
		replacers = {
			"d": function (date) {
				return getters.getDate.call(date);
			},

			"dd": function (date) {
				var day = this.d(date);

				return padZeros(2, day);
			},

			"ddd": function (date) {
				var weekday = this.dddd(date);

				return weekday.slice(0, 3);
			},

			"dddd": function (date) {
				var weekdayNumber = getters.getDay.call(date);

				return weekdays[weekdayNumber];
			},

			"m": function (date) {
				return getters.getMonth.call(date) + 1;
			},

			"mm": function (date) {
				var month = this.m(date);

				return padZeros(2, month);
			},

			"mmm": function (date) {
				var monthName = this.mmmm(date);

				return monthName.slice(0, 3);
			},

			"mmmm": function (date) {
				var monthNumber = getters.getMonth.call(date),
					monthName = months[monthNumber];

				return monthName;
			},

			"yy": function (date) {
				var year = this.yyyy(date).toString();

				return year.slice(2);
			},

			"yyyy": function (date) {
				return getters.getFullYear.call(date);
			},

			"h": function (date) {
				var hour = this.H(date);

				if (hour % MIDNIGHT === 0) {
					hour = MIDNIGHT;
				}

				return hour;
			},

			"hh": function (date) {
				var hour = this.h(date);

				return padZeros(2, hour);
			},

			"H": function (date) {
				return getters.getHours.call(date);
			},

			"HH": function (date) {
				var hour = this.H(date);

				return padZeros(2, hour);
			},

			"M": function (date) {
				return getters.getMinutes.call(date);
			},

			"MM": function (date) {
				var minute = this.M(date);

				return padZeros(2, minute);
			},

			"s": function (date) {
				return getters.getSeconds.call(date);
			},

			"ss": function (date) {
				var second = this.s(date);

				return padZeros(2, second);
			},

			"l": function (date) {
				return getters.getMilliseconds.call(date);
			},

			"L": function (date) {
				var millisecond = this.l(date);

				return padZeros(3, millisecond);
			},

			"t": function (date) {
				var period;

				if (isAM(date)) {
					period = "a";

				} else {
					period = "p";
				}

				return period;
			},

			"tt": function (date) {
				var period = this.t(date) + "m";

				return period;
			},

			"T": function (date) {
				var period = this.t(date);

				return period.toUpperCase();
			},

			"TT": function (date) {
				var period = this.tt(date);

				return period.toUpperCase();
			},

			"r": function (date) {
				var dayOfMonth = getters.getDate.call(date),
					suffixes = ["th", "st", "nd", "rd"],
					index = dayOfMonth % 10;

				if (index > 3 || (dayOfMonth > 10 && dayOfMonth < 14)) {
					index = 0;
				}

				return suffixes[index];
			}
		};

	function setGetters (UTC) {

		if (UTC) {
			getters = gettersUTC;

		} else {
			getters = gettersLocal;
		}
	}

	function padZeros (places, number) {
		var string = number.toString();

		while (string.length < places) {
			string = "0"+ string;
		}

		return string;
	}

	function isAM (date) {
		return getters.getHours.call(date) < NOON;
	}

	function format (mask, UTC) {
		var date = this;

		if (type.is.not("date", date)) {
			date = new Date(date);
		}

		if (stockMasks[mask]) {
			mask = stockMasks[mask];
		}

		setGetters(UTC);

		return mask.replace(maskParts, function (part, quote, escaped) {
			var replacement = "";

			if (quote) {
				replacement = escaped || quote;

			} else {
				replacement = replacers[part](date);
			}

			return replacement;
		});
	}

	DateProto.format = format;
});