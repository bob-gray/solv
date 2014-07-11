define(["solv/array/copy"], function () {
	"use strict";

	describe("array.copy", function () {
		it("should create a shallow copy of an array", function () {
			var array = [1, 2, 3, 4, 5],
				copy = Array.copy(array);
			
			expect(array.join()).toBe(copy.join());
			copy.shift();
			expect(array.length).not.toBe(copy.length);
		});
		
		it("should not be recursive", function () {
			var nested = [1],
				object = {},
				array = [object, nested],
				copy = Array.copy(array);
			expect(array[0]).toBe(copy[0]);
			expect(array[1]).toBe(copy[1]);
		});
		
		it("should be available as a static method or an instance method", function () {
			var nested = [1],
				object = {},
				array = [object, nested],
				copy = array.copy();
			expect(array[0]).toBe(copy[0]);
			expect(array[1]).toBe(copy[1]);
		});
	});
});