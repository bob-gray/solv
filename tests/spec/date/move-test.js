define(["solv/date/move"], function () {
	"use strict";

	describe("date.move", function () {
		var year,
			month,
			day,
			hour,
			minute,
			second,
			millisecond,
			birthDate;
		
		beforeEach(function () {
			year = 1980;
			month = 3; // April
			day = 18;
			hour = 8;
			minute = 14;
			second = 23;
			millisecond = 234;
			birthDate = new Date(year, month, day, hour, minute, second, millisecond);
		});

		it("moves a date in place", function () {
			birthDate.move("y", 2);
			expect(birthDate.getFullYear()).toBe(1982);
		});
	});
});