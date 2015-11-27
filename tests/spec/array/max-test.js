define(["solv/array/max"], function () {
	"use strict";

	describe("array.max", function () {
		var array;

		it("should get the maximum numeric value in the array", function () {
			expect([1,2,-10,1,-2,0.8473,1,2,"0"].max()).toBe(2);
		});

		it("should return NaN if values are not numeric", function () {
			expect(isNaN([1,2,-10,"fooey"].max())).toBe(true);
		});

		it("should return -infinity if array is empty", function () {
			expect([].max()).toBe(-Infinity);
		});
	});
});