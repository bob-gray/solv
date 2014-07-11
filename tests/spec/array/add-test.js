define(["solv/array/add"], function () {
	"use strict";

	describe("array.add", function () {
		var array,
			string,
			number,
			object;

		beforeEach(function () {
			array = [];
			string = "string";
			number = 100;
			object = {};
		});

		it("should add a unique value to an array", function () {
			array.add(string);
			expect(array.length).toBe(1);
		});

		it("should not add a value to an array that is already in the array", function () {
			array.add(number);
			array.add(number);
			expect(array.length).toBe(1);
		});

		it("should work with objects", function () {
			array.add(object);
			array.add(object);
			expect(array.length).toBe(1);
			array.add({});
			expect(array.length).toBe(2);
		});
	});
});