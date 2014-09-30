define(["solv/util/id"], function (Id) {
	"use strict";

	describe("Id", function () {
		it("getNext method returns a new incremented id on each call", function () {
			var id = new Id(),
				first = id.getNext(),
				second = id.getNext(),
				third = id.getNext();

			expect(third).toBeGreaterThan(second);
			expect(second).toBeGreaterThan(first);
		});
	});
});