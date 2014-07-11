define(["solv/date/is-daylight-savings"], function (util) {
	"use strict";

	describe("Date.isDaylightSavings", function () {
		it("should return true if hour from standard time greater than 0", function () {
			var now = new Date(),
				fromStandard = now.hoursFromStandard();

			if (fromStandard > 0) {
				expect(now.isDaylightSavings()).toBe(true);
			} else {
				expect(now.isDaylightSavings()).toBe(false);
			}
		});
	});
});