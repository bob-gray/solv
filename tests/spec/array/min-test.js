define(["solv/array/min"], function () {
	"use strict";

	describe("array.min", function () {
		var array;

		it("should get the minimum numeric value in the array", function () {
			expect([1,2,-10,1,-2,0.8473,1,2,"0"].min()).toBe(-10);
		});

		it("should return NaN if values are not numeric", function () {
			expect(isNaN([1,2,-10,"fooey"].min())).toBe(true);
		});

		it("should return infinity if array is empty", function () {
			expect([].min()).toBe(Infinity);
		});
	});
});