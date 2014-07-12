define(["solv/object/is-empty"], function () {
	"use strict";

	describe("Object.isEmpty", function () {
		it("should return true for an empty object", function () {
			expect(Object.isEmpty({})).toBe(true);
		});

		it("should return false for an object with properties", function () {
			expect(Object.isEmpty({empty: false})).toBe(false);
		});
	});
});