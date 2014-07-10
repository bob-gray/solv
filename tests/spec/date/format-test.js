define(["solv/date/format"], function () {
	"use strict";

	describe("date.format", function () {
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

		it("replaces all supported mask parts", function () {
			expect(birthDate.format("d dd ddd dddd m mm mmm mmmm yy yyyy H HH h hh M MM s ss T TT t tt L l r"))
				.toBe("18 18 Fri Friday 4 04 Apr April 80 1980 8 08 8 08 14 14 23 23 A AM a am 234 234 th");
		});

		it("doesn't replace character escaped with single quotes", function () {
			expect(birthDate.format("'This' dr 'day of' mmmm"))
				.toBe("This 18th day of April");
		});

		it("doesn't replace character escaped with double quotes", function () {
			expect(birthDate.format("yyyy-mm-dd\"T\"HH:MM:ss"))
				.toBe("1980-04-18T08:14:23");
		});

		it("supports stock masks \"short_date\"", function () {
			expect(birthDate.format("short_date")).toBe("4/18/80");
		});

		it("supports stock masks \"medium_date\"", function () {
			expect(birthDate.format("medium_date")).toBe("Apr 18, 1980");
		});

		it("supports stock masks \"long_date\"", function () {
			expect(birthDate.format("long_date")).toBe("April 18, 1980");
		});

		it("supports stock masks \"full_date\"", function () {
			expect(birthDate.format("full_date")).toBe("Friday, April 18, 1980");
		});

		it("supports stock masks \"short_time\"", function () {
			expect(birthDate.format("short_time")).toBe("8:14a");
		});

		it("supports stock masks \"medium_time\"", function () {
			expect(birthDate.format("medium_time")).toBe("8:14:23 AM");
		});

		it("supports stock masks \"long_time\"", function () {
			expect(birthDate.format("long_time")).toBe("08:14:23.234");
		});

		it("supports stock masks \"iso_date\"", function () {
			expect(birthDate.format("iso_date")).toBe("1980-04-18");
		});

		it("supports stock masks \"iso_time\"", function () {
			expect(birthDate.format("iso_time")).toBe("08:14:23");
		});

		it("supports stock masks \"iso_datetime\"", function () {
			expect(birthDate.format("iso_datetime")).toBe("1980-04-18T08:14:23");
		});
	});
});