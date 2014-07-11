define(["solv/date/hours-from-standard"], function (util) {
	"use strict";

	describe("Date.hoursFromStandard", function () {
		var jan1,
			july1;

		beforeEach(function () {
			jan1 = new Date("1/1/2014");
			july1 = new Date("7/1/2014");
		});

		it("should return an integer", function () {
			expect(isInteger(jan1.hoursFromStandard())).toBe(true);
			expect(isInteger(july1.hoursFromStandard())).toBe(true);
		});

		it("should return a number greater than or equal to 0", function () {
			expect(jan1.hoursFromStandard() >= 0).toBe(true);
			expect(july1.hoursFromStandard() >= 0).toBe(true);
		});
	});

	function isInteger(number) {
		return number % 1 === 0;
	}
});