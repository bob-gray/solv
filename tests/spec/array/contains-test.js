define(["solv/array/contains"], function () {
	"use strict";

	describe("array.contains", function () {
		var array,
			string,
			number,
			object;

		beforeEach(function () {
			string = "string";
			number = 100;
			object = {};
			array = [string, object, string];
		});

		it("should return true for values found in the array", function () {
			expect(array.contains(string)).toBe(true);
		});

		it("should return false for values not found in the array", function () {
			expect(array.contains(number)).toBe(false);
		});

		it("should work with objects", function () {
			expect(array.contains(object)).toBe(true);
			expect(array.contains({})).toBe(false);
		});
	});
});