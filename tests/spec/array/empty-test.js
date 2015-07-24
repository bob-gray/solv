define(["solv/array/empty"], function () {
	"use strict";

	describe("array.empty", function () {
		var array;

		beforeEach(function () {
			array = [1,2,3];
		});

		it("should empty values from an array", function () {
			array.empty();
			expect(array.length).toBe(0);
		});

		it("should not error when called an already empty array", function () {
			expect(doubleEmpty).not.toThrow();

			function doubleEmpty () {
				array.empty();
				array.empty();
			}
		});

		it("should empty the array in place", function () {
			var original = array;

			array.empty();
			expect(array).toBe(original);
		});
	});
});