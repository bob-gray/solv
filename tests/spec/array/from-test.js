define(["solv/array/from"], function (from) {
	"use strict";

	describe("Array.from", function () {
		it("returns a real array from arguments", function () {
			expect(isArray(arguments)).toBe(false);
			expect(isArray(Array.from(arguments))).toBe(true);
		});
		
		it("returns a real array from plain array-like object", function () {
			var object = {
				0: "zero",
				1: "one",
				2: "two",
				length: 3
			};
			expect(isArray(object)).toBe(false);
			expect(isArray(Array.from(object))).toBe(true);
		});

		it("returns a real array filled with the same values as arguments", function () {
			var obj = {};
			test("first arg", obj, null);
			function test () {
				var args = Array.from(arguments);
				expect(args.length).toBe(3);
				expect(args[0]).toBe("first arg");
				expect(args[1]).toBe(obj);
				expect(args.pop()).toBeNull();
				expect(args.length).toBe(2);
			}
		});
	});

	function isArray (value) {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
});