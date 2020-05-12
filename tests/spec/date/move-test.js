define(["solv/date/move", "solv/date/compare"], function () {
	"use strict";

	describe("date.move", function () {
		var birthDate;

		beforeEach(function () {
			var year = 1980,
				month = 3, // April
				day = 18,
				hour = 8,
				minute = 14,
				second = 23,
				millisecond = 234;
			birthDate = new Date(year, month, day, hour, minute, second, millisecond);
		});

		it("moves a date in place", function () {
			birthDate.move(2, "y");
			expect(birthDate.getFullYear()).toBe(1982);
		});

		it("moves date backward", function () {
			birthDate.move(-13, "m");
			expect(birthDate.getMonth()).toBe(2);
			expect(birthDate.getFullYear()).toBe(1979);
		});

		forEachDatePart(function (part) {
			xit ("supports date part "+ part, function () {
				var amount = plusOrMinus100(),
					birthDate2 = new Date(+birthDate);

				birthDate2.move(amount, part);
				expect(birthDate.compare(birthDate2, part)).toBe(amount);
			});
		});
	});

	function forEachDatePart (callback) {
		var parts = ["d", "w", "m", "q", "y", "h", "M", "s", "l"],
			numOfParts = parts.length,
			i = 0;

		for (; i < numOfParts; i += 1) {
			callback(parts[i]);
		}
	}

	function plusOrMinus100 () {
		return Math.floor(100 - (Math.random() * 200));
	}
});