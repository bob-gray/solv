define(["solv/array/remove-last"], function () {
	"use strict";

	describe("array.removeLast", function () {
		it("removes the last occurrence of an item from an array", function () {
			var array = [1, 2, 3, 4, 5, 1];
			array.removeLast(1);
			expect(array.length).toBe(5);
			expect(array.join(", ")).toBe("1, 2, 3, 4, 5");
		});

		it("leaves an array without the criteria unaltered", function () {
			var array = [1, 2, 3, 4, 5, 1];
			array.removeLast(10);
			expect(array.length).toBe(6);
			expect(array.join(", ")).toBe("1, 2, 3, 4, 5, 1");
		});
	});
});