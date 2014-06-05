if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta"),
		type = require("../type");

	var DateProto = Date.prototype,
		daysInWeek = 7,
		monthsInQuarter = 3,
		movers = {
			"d": function (date, count) {
				var day = date.getDate(),
					newDay = day + count;

				date.setDate(newDay);
			},

			"w": function (date, count) {
				this.d(date, count * daysInWeek);
			},

			"m": function (date, count) {
				var month = date.getMonth(),
					newMonth = month + count;

				date.setMonth(newMonth);
			},

			"q": function (date, count) {
				this.m(date, count * monthsInQuarter);
			},

			"y": function (date, count) {
				var year = date.getFullYear(),
					newYear = year + count;

				date.setFullYear(newYear);
			},

			"h": function (date, count) {
				var hour = date.getHours(),
					newHour = hour + count;

				date.setHours(newHour);
			},

			"M": function (date, count) {
				var minute = date.getMinutes(),
					newMinute = minute + count;

				date.setMinutes(newMinute);
			},

			"s": function (date, count) {
				var second = date.getSeconds(),
					newSecond = second + count;

				date.setSeconds(newSecond);
			},

			"l": function (date, count) {
				var millisecond = date._getMilliseconds(),
					newMillisecond = millisecond + count;

				date.setMilliseconds(newMillisecond);
			}
		};

	function move (count, part) {
		var date = this;

		if (type.is.not("date", date)) {
			date = new Date(date);
		}

		movers[part](date, count);
	}

	DateProto.move = move;	
});