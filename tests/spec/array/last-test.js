define(["solv/array/last"], function () {
	"use strict";

	describe("array.last", function () {
		var array;

		beforeEach(function () {
			array = [1,2,3];
		});

		it("should return the last value in the array", function () {
			expect(array.last()).toBe(3);
		});

		it("should return undefined if array is empty", function () {
			expect([].last()).toBeUndefined();
		});

		it("should not alter array", function () {
			expect(array.last()).toBe(array.last());
		});

		it("should return current last value after array.pop", function () {
			array.pop();
			expect(array.last()).toBe(2);
		});

		it("should return current last value after array.push", function () {
			array.push(4);
			expect(array.last()).toBe(4);
		});

		it("should return current last value after direct assignment", function () {
			array[3] = 4;
			expect(array.last()).toBe(4);
		});
	});
});