define(["solv/array/sum"], function () {
	"use strict";

	describe("array.sum", function () {
		var array;

		it("should sum the values in the array", function () {
			expect([10,100,1000].sum()).toBe(1110);
		});

		it("should return zero if array is empty", function () {
			expect([].sum()).toBe(0);
		});
	});
});