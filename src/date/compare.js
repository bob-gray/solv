if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta"),
		type = require("../type");

	var DateProto = Date.prototype,
		millisecondsInMinute = 60000,
		secondsInMinute = 60,
		minutesInHour = 60,
		hoursInDay = 24,
		millisecondsInDay = millisecondsInMinute * minutesInHour * hoursInDay,
		comparers = {
			"l": function (date1, date2) {
				return date2 - date1;
			},

			"s": function (date1, date2) {
				var minutesDiff = this.M(date1, date2),
					secondsDiff = date2.getSeconds() - date1.getSeconds();

				return minutesDiff * secondsInMinute + secondsDiff;
			},

			"M": function (date1, date2) {
				var hoursDiff = this.h(date1, date2),
					minutesDiff = date2.getMinutes() - date1.getMinutes();

				return hoursDiff * minutesInHour + minutesDiff;
			},

			"h": function (date1, date2) {
				var daysDiff = this.d(date1, date2),
					hoursDiff = date2.getHours() - date1.getHours();

				return daysDiff * hoursInDay + hoursDiff;
			},

			"d": function (date1, date2) {
				var offset = (date2.getTimezoneOffset() - date1.getTimezoneOffset()) * millisecondsInMinute,
					day1 = new Date(date1).setHours(0, 0, 0, 0),
					day2 = new Date(date2).setHours(0, 0, 0, 0);

				return Math.floor((day2 - day1 + offset) / millisecondsInDay);
			},

			"w": function (date1, date2) {
				return Math.floor(this.d(date1, date2) / 7);
			},

			"m": function (date1, date2) {
				return this.y(date1, date2) * 12 + date2.getMonth() - date1.getMonth();
			},

			"q": function (date1, date2) {
				return Math.floor(this.m(date1, date2) / 3);
			},

			"y": function (date1, date2) {
				return date2.getFullYear() - date1.getFullYear();
			}
		};

	function compare (date2, part) {
		var date1 = this;

		if (type.is.not("date", date1)) {
			date1 = new Date(date1);
		}

		if (type.is.not("date", date2)) {
			date2 = new Date(date2);
		}

		return comparers[part](date1, date2, part);
	}

	DateProto.compare = compare;	
});