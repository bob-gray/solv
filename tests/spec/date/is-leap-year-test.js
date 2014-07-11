define(["solv/date/is-leap-year"], function () {
	"use strict";

	describe("Date.isLeapYear", function () {
		it("should return true for leap year", function () {
			expect(Date.isLeapYear(2012)).toBe(true);
		});

		it("should return false for non leap year", function () {
			expect(Date.isLeapYear(2014)).toBe(false);
		});
	});
});