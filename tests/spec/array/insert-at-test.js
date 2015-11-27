define(["solv/array/insert-at"], function () {
	"use strict";

	describe("array.insertAt", function () {
		var array;

		beforeEach(function () {
			array = [1,2,3];
		});

		it("should insert value into array", function () {
			array.insertAt(1, 1.1);
			expect(array[1]).toBe(1.1);
		});

		it("should insert more than one value", function () {
			array.insertAt(1, 1.1, 1.2, 1.3);
			expect(array.slice(1, 4).join()).toBe("1.1,1.2,1.3");
		});

		it("should insert value at 0", function () {
			array.insertAt(0, 0);
			expect(array[0]).toBe(0);
		});

		it("should insert at end", function () {
			array.insertAt(array.length, "end");
			expect(array.pop()).toBe("end");
		});

		it("should insert at index even if index is greater than array.length", function () {
			array.insertAt(100, "end");
			expect(array.length).toBe(101)
			expect(array.pop()).toBe("end");
		});

		it("should insert from the end if index is negative", function () {
			array.insertAt(-2, "middle");
			expect(array[array.length - 3]).toBe("middle");
		});

		it("should insert at beginning if index is negative with an absolute value greater than array.length", function () {
			array.insertAt(-100, "beginning");
			expect(array[0]).toBe("beginning");
		});

		it("should insert more than one value with negative index", function () {
			array.insertAt(-2, "middle", "other");
			expect(array.slice(array.length - 4, 3).join()).toBe("middle,other");
		});
	});
});