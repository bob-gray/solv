define(["solv/array/first"], function () {
	"use strict";

	describe("array.first", function () {
		var array;

		beforeEach(function () {
			array = [1,2,3];
		});

		it("should return the first value in the array", function () {
			expect(array.first()).toBe(1);
		});

		it("should return undefined if array is empty", function () {
			expect([].first()).toBeUndefined();
		});

		it("should not alter array", function () {
			expect(array.first()).toBe(array.first());
		});

		it("should return current first value after array.shift", function () {
			array.shift();
			expect(array.first()).toBe(2);
		});

		it("should return current first value after array.unshift", function () {
			array.unshift("one");
			expect(array.first()).toBe("one");
		});

		it("should return current first value after direct assignment", function () {
			array[0] = "one";
			expect(array.first()).toBe("one");
		});
	});
});