define(["solv/array/replace"], function () {
	"use strict";

	describe("array.replace", function () {
		it("replaces all occurrences of an item", function () {
			var array = [0, 1, 2, 3, 4, 4];
			array.replace(4, "four");
			expect(array.length).toBe(6);
			expect(array[4]).toBe("four");
			expect(array[5]).toBe("four");
		});

		it("inserts more than one replacement", function () {
			var array = [0, 1, 2, 3, 4, 4];
			array.replace(1, "one", "uno");
			expect(array.length).toBe(7);
			expect(array[1]).toBe("one");
			expect(array[2]).toBe("uno");
		});

		it("leaves an array without the criteria unaltered", function () {
			var array = [1, 2, 3, 4, 5, 1];
			array.replace(10, "ten");
			expect(array.length).toBe(6);
			expect(array.join(", ")).toBe("1, 2, 3, 4, 5, 1");
		});
	});
});