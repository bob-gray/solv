define(["solv/array/of"], function () {
	"use strict";

	describe("array.of", function () {
		it("creates an array of the arguments passed to it", function () {
			var array = Array.of(5),
				array2 = Array.of(array, {}, true);
			
			expect(array.length).toBe(1);
			expect(array[0]).toBe(5);
			expect(array2.length).toBe(3);
			expect(array2[0]).toBe(array);
		});
	});
});