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
	
	var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		stockMasks = {
			short_date: "m/d/yy",
			medium_date: "mmm d, yyyy",
			long_date: "mmmm d, yyyy",
			full_date: "dddd, mmmm d, yyyy",
			short_time: "h:MMt",
			medium_time: "h:MM:ss TT",
			long_time: "h:MM:ss TT Z",
			iso_date: "yyyy-mm-dd",
			iso_time: "HH:MM:ss",
			iso_datetime: "yyyy-mm-dd\"T\"HH:MM:ss"
		},
		DateProto = Date.prototype,
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
		matchers = {
			maskParts: /("|')(.*?)\1|d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTtz])\3?|[LlrZ]/g,
			timeZone: /[^(]+(?=\))/,
			acronym: /\b\w/g
		},
		replacers = {
			"d": function () {
				return getters.getDate.call(this);
			},

			"dd": function () {
				return pad(getters.getDate.call(this));
			},

			"ddd": function () {
				return weekdays[getters.getDay.call(this)].slice(0, 3);
			},

			"dddd": function () {
				return weekdays[getters.getDay.call(this)];
			},

			"m": function () {
				return getters.getMonth.call(this) + 1;
			},

			"mm": function () {
				return pad(getters.getMonth.call(this) + 1);
			},

			"mmm": function () {
				return months[getters.getMonth.call(this)].slice(0, 3);
			},

			"mmmm": function () {
				return months[getters.getMonth.call(this)];
			},

			"yy": function () {
				return getters.getFullYear.call(this).toString().slice(2);
			},

			"yyyy": function () {
				return getters.getFullYear.call(this);
			},

			"h": function () {
				return getters.getHours.call(this) % 12 || 12;
			},

			"hh": function () {
				return pad(getters.getHours.call(this) % 12 || 12);
			},

			"H": function () {
				return getters.getHours.call(this);
			},

			"HH": function () {
				return pad(getters.getHours.call(this));
			},

			"M": function () {
				return getters.getMinutes.call(this);
			},

			"MM": function () {
				return pad(getters.getMinutes.call(this));
			},

			"s": function () {
				return getters.getSeconds.call(this);
			},

			"ss": function () {
				return pad(getters.getSeconds.call(this));
			},

			"l": function () {
				return getters.getMilliseconds.call(this);
			},

			"L": function () {
				return pad(getters.getMilliseconds.call(this), 3);
			},

			"t": function () {
				return isAM(this) ? "a" : "p";
			},

			"tt": function () {
				return isAM(this) ? "am" : "pm";
			},

			"T": function () {
				return isAM(this) ? "A" : "P";
			},

			"TT": function () {
				return isAM(this) ? "AM" : "PM";
			},

			"z": function () {
				return getTimeZone(this).split(" ")[0];
			},

			"zz": function () {
				return getTimeZone(this);
			},

			"Z": function () {
				return getTimeZone(this).match(matchers.acronym).join("");
			},

			"r": function () {
				var dayOfMonth = getters.getDate.call(this),
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

	function pad (number, count) {
		var string = number.toString();

		while (string.length < count) {
			string = "0"+ string;
		}

		return string;
	}

	function isAM (date) {
		return getters.getHours.call(date) < 12;
	}

	function getTimeZone (date){
		return date.toTimeString().match(matchers.timeZone)[0];
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

		return mask.replace(matchers.maskParts, function (part, quote, escaped) {
			var replacement = "";

			if (quote) {
				replacement = escaped || quote;

			} else {
				replacement = replacers[part].call(date);
			}

			return replacement;
		});
	}

	DateProto.format = format;
});