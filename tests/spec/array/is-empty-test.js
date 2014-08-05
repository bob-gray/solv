define(["solv/array/is-empty"], function () {
	"use strict";

	describe("array.isEmpty", function () {
		var array;

		beforeEach(function () {
			array = [1,2,3];
		});

		it("should return true if array has 0 length", function () {
			expect([].isEmpty()).toBe(true);
		});

		it("should return false if array has length", function () {
			expect(array.isEmpty()).toBe(false);
		});

		it("should return true even if array used to have length", function () {
			array.length = 0;
			expect(array.isEmpty()).toBe(true);
		});

		it("should return true even if array items are falsey", function () {
			expect([null].isEmpty()).toBe(false);
		});

		it("should return false if items are added with push", function () {
			array = [];
			array.push(1);
			expect(array.isEmpty()).toBe(false);
		});

		it("should return true if all items are removed with pop", function () {
			array.pop();
			array.pop();
			array.pop();
			expect(array.isEmpty()).toBe(true);
		});
	});
});