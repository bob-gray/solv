define(["solv/array/remove"], function () {
	"use strict";

	describe("array.remove", function () {
		it("removes the all occurrence of an item from an array", function () {
			var array = [1, 2, 3, 4, 5, 1];
			array.remove(1);
			expect(array.length).toBe(4);
			expect(array.join(", ")).toBe("2, 3, 4, 5");
		});

		it("leaves an array without the criteria unaltered", function () {
			var array = [1, 2, 3, 4, 5, 1];
			array.remove(10);
			expect(array.length).toBe(6);
			expect(array.join(", ")).toBe("1, 2, 3, 4, 5, 1");
		});
	});
});