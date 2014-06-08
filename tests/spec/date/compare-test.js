define(["solv/date/compare"], function () {
	"use strict";

	describe("date.compare", function () {
		var date1,
			date2,
			diffs;
		
		beforeEach(function () {
			date1 = new Date(1969, 1, 20, 4, 47, 36, 4);
			date2 = new Date(1970, 10, 2, 20, 0, 59, 998);
			diffs = {"d": 620, "w": 88, "m": 21, "q": 7, "y": 1, "h": 14896, "M": 893713, "s": 53622803, "l": 53622803994};
		});

		forEachDatePart(function (part) {
			it ("supports date part "+ part, function () {
				expect(date1.compare(date2, part)).toBe(diffs[part]);
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
});