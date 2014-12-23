define(["solv/array/remove-first"], function () {
	"use strict";

	describe("array.removeFirst", function () {
		it("removes the first occurrence of an item from an array", function () {
			var array = [1, 2, 3, 4, 5, 1];
			array.removeFirst(1);
			expect(array.length).toBe(5);
			expect(array.join(", ")).toBe("2, 3, 4, 5, 1");
		});

		it("leaves an array without the criteria unaltered", function () {
			var array = [1, 2, 3, 4, 5, 1];
			array.removeFirst(10);
			expect(array.length).toBe(6);
			expect(array.join(", ")).toBe("1, 2, 3, 4, 5, 1");
		});
	});
});