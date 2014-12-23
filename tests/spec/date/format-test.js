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
			hour = 13;
			minute = 14;
			second = 23;
			millisecond = 234;
			birthDate = new Date(year, month, day, hour, minute, second, millisecond);
		});

		it("replaces all supported mask parts", function () {
			expect(birthDate.format("d dd ddd dddd m mm mmm mmmm yy yyyy H HH h hh M MM s ss T TT t tt L l r"))
				.toBe("18 18 Fri Friday 4 04 Apr April 80 1980 13 13 1 01 14 14 23 23 P PM p pm 234 234 th");
		});

		it("doesn't replace character escaped with single quotes", function () {
			expect(birthDate.format("'This' dr 'day of' mmmm"))
				.toBe("This 18th day of April");
		});

		it("doesn't replace character escaped with double quotes", function () {
			expect(birthDate.format("yyyy-mm-dd\"T\"HH:MM:ss"))
				.toBe("1980-04-18T13:14:23");
		});

		it("double quotes are escaped by repeating twice", function () {
			expect(birthDate.format("yyyy-mm-dd\"\""))
				.toBe("1980-04-18\"");
		});

		it("single quotes are escaped by repeating twice", function () {
			expect(birthDate.format("yyyy-mm-dd''"))
				.toBe("1980-04-18'");
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
			expect(birthDate.format("short_time")).toBe("1:14p");
		});

		it("supports stock masks \"medium_time\"", function () {
			expect(birthDate.format("medium_time")).toBe("1:14:23 PM");
		});

		it("supports stock masks \"long_time\"", function () {
			expect(birthDate.format("long_time")).toBe("13:14:23.234");
		});

		it("supports stock masks \"iso_date\"", function () {
			expect(birthDate.format("iso_date")).toBe("1980-04-18");
		});

		it("supports stock masks \"iso_time\"", function () {
			expect(birthDate.format("iso_time")).toBe("13:14:23");
		});

		it("supports stock masks \"iso_datetime\"", function () {
			expect(birthDate.format("iso_datetime")).toBe("1980-04-18T13:14:23");
		});

		it("supports UTC", function () {
			var UTC = true,
				birthDate = new Date("4/18/1980"),
				offset = birthDate.getTimezoneOffset() / 60;

			expect(birthDate.format("H", UTC) - birthDate.format("H")).toBe(offset);
		});

		it("handles am and pm", function () {
			expect(new Date(1980, 3, 18, 0, 0, 0, 0).format("tt")).toBe("am");
			expect(new Date(1980, 3, 18, 12, 0, 0, 0).format("tt")).toBe("pm");
		});

		it("handles edge case midnight", function () {
			expect(new Date("4/18/1980").format("h")).toBe("12");
			expect(new Date("4/18/1980").format("H")).toBe("0");
		});

		it("handles edge cases 10th-13th", function () {
			expect(new Date("4/10/1980").format("r")).toBe("th");
			expect(new Date("4/11/1980").format("r")).toBe("th");
			expect(new Date("4/12/1980").format("r")).toBe("th");
			expect(new Date("4/13/1980").format("r")).toBe("th");
		});
	});
});