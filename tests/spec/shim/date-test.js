define(["solv/shim/date"], function (dateShims) {
	"use strict";

	describe("Date.now", function () {

		it("returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC", function () {
			expect(new Date() - Date.now()).toBeLessThan(10);
		});

		if (Date.now !== dateShims.now) {
			it("returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC [shim]", function () {
				expect(new Date() - dateShims.now()).toBeLessThan(10);
			});
		}
	});
});

