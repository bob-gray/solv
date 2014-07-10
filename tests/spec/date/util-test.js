define(["solv/date/util"], function (util) {
	"use strict";

	describe("DateUtil.hoursFromStandard", function () {
		var jan1,
			jul1;

		beforeEach(function () {
			jan1 = new Date("1/1/2014");
			jul1 = new Date("7/1/2014");
		});

		it("should return an integer", function () {
			var jan1fromStandard = util.hoursFromStandard(jan1),
				jul1fromStandard = util.hoursFromStandard(jul1);

			expect(isInteger(jan1fromStandard)).toBe(true);
			expect(isInteger(jul1fromStandard)).toBe(true);
		});

		it("should return a number greater than or equal to 0", function () {
			var jan1fromStandard = util.hoursFromStandard(jan1),
				jul1fromStandard = util.hoursFromStandard(jul1);

			expect(jan1fromStandard >= 0).toBe(true);
			expect(jul1fromStandard >= 0).toBe(true);
		});

		it("should accept a date string", function () {
			var jan1fromStandard = util.hoursFromStandard("1/1/2014");

			expect(isInteger(jan1fromStandard)).toBe(true);
		});

		it("should accept a numeric date", function () {
			var timestamp = new Date().getTime(),
				fromStandard = util.hoursFromStandard(timestamp);

			expect(isInteger(fromStandard)).toBe(true);
		});
	});

	describe("DateUtil.isLeapYear", function () {
		it("should return true for leap year", function () {
			expect(util.isLeapYear(2012)).toBe(true);
		});

		it("should return false for non leap year", function () {
			expect(util.isLeapYear(2014)).toBe(false);
		});
	});

	describe("DateUtil.isDaylightSavings", function () {
		it("should return true if hour from standard time greater than 0", function () {
			var now = new Date(),
				fromStandard = util.hoursFromStandard(now);

			if (fromStandard > 0) {
				expect(util.isDaylightSavings(now)).toBe(true);
			} else {
				expect(util.isDaylightSavings(now)).toBe(false);
			}
		});

		it("should accept a date string", function () {
			var daylightSavings = util.isDaylightSavings("4/18/2014");

			expect(/^(?:true|false)$/.test(daylightSavings)).toBe(true);
		});

		it("should accept a numeric date", function () {
			var timestamp = new Date().getTime(),
				daylightSavings = util.isDaylightSavings("4/18/2014");

			expect(/^(?:true|false)$/.test(daylightSavings)).toBe(true);
		});
	});

	function isInteger(number) {
		return number % 1 === 0;
	}
});