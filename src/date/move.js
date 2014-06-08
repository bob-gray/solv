/* istanbul ignore if */
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
			"d": function (date, amount) {
				var day = date.getDate(),
					newDay = day + amount;

				date.setDate(newDay);
			},

			"w": function (date, amount) {
				this.d(date, amount * daysInWeek);
			},

			"m": function (date, amount) {
				var month = date.getMonth(),
					newMonth = month + amount;

				date.setMonth(newMonth);
			},

			"q": function (date, amount) {
				this.m(date, amount * monthsInQuarter);
			},

			"y": function (date, amount) {
				var year = date.getFullYear(),
					newYear = year + amount;

				date.setFullYear(newYear);
			},

			"h": function (date, amount) {
				var hour = date.getHours(),
					newHour = hour + amount;

				date.setHours(newHour);
			},

			"M": function (date, amount) {
				var minute = date.getMinutes(),
					newMinute = minute + amount;

				date.setMinutes(newMinute);
			},

			"s": function (date, amount) {
				var second = date.getSeconds(),
					newSecond = second + amount;

				date.setSeconds(newSecond);
			},

			"l": function (date, amount) {
				var millisecond = date.getMilliseconds(),
					newMillisecond = millisecond + amount;

				date.setMilliseconds(newMillisecond);
			}
		};

	function move (amount, part) {
		var date = this;

		if (type.is.not("date", date)) {
			date = new Date(date);
		}

		movers[part](date, amount);
	}

	DateProto.move = move;	
});