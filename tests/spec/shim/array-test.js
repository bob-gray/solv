define(["src/shim/array"], function () {
	"use strict";

	describe("Array.fromArguments(arguments)", function () {
		it("returns a real array", function () {
			expect(isArray(arguments)).toBe(false);
			expect(isArray(Array.fromArguments(arguments))).toBe(true);
		});

		it("returns a real array filled with the same values as arguments", function () {
			var obj = {};
			test("first arg", obj, null);
			function test () {
				var args = Array.fromArguments(arguments);
				expect(args.length).toBe(3);
				expect(args[0]).toBe("first arg");
				expect(args[1]).toBe(obj);
				expect(args.pop()).toBeNull();
				expect(args.length).toBe(2);
			}
		});
	});

	describe("array.forEach(callback, context)", function () {
		it("executes callback once per array element", function () {
			var array = [1, 2, 3];
			array.forEach(function (num, index, arr) {
				expect(num).toBe(index + 1);
				expect(arr).toBe(array);
			});
		});
	});

	function isArray (value) {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
});


