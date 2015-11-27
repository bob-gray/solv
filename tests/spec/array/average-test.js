define(["solv/array/average"], function () {
	"use strict";

	describe("array.average", function () {
		var array;

		it("should calculate the average value in the array", function () {
			expect([1,2,1,2,1,2].average()).toBe(1.5);
		});

		it("should return zero if array is empty", function () {
			expect([].average()).toBe(0);
		});
	});
});