define(["solv/array/remove"], function () {
	"use strict";

	describe("array.remove", function () {
		it("removes the first occurrence of an item from an array", function () {
			var array = [1, 2, 3, 4, 5, 1];
			array.remove(1);
			expect(array.length).toBe(5);
			expect(array[0]).toBe(2);
			expect(array[4]).toBe(1);
		});
		
		it("leaves an array without the criteria unaltered", function () {
			var array = [1, 2, 3, 4, 5, 1];
			array.remove(10);
			expect(array.length).toBe(6);
			expect(array[0]).toBe(1);
			expect(array[4]).toBe(5);
		});
	});
});