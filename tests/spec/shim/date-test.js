define(["solv/shim/date"], function () {
	"use strict";

	describe("Date.now", function () {
		it("returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC", function () {
			expect(new Date() - Date.now()).toBeLessThan(10);
		});
	});
});

