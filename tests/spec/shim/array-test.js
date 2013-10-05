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

		it("passes (element, index, array) to callback", function () {
			var array = [1, 2, 3];
			array.forEach(function (num, index, arr) {
				expect(num).toBe(arr[index]);
			});
		});

		it("loops 0 to length forwards", function () {
			var array = [1, 2, 3];
			[1, 2, 3].forEach(function (num, index, arr) {
				expect(num).toBe(array.shift());
			});
		});

		it("executes callback with context passed as second parameter", function () {
			var array = [1, 2, 3],
				context = {};
			array.forEach(function (num, index, arr) {
				expect(this).toBe(context);
			}, context);
		});
	});

	describe("array.map(callback, context)", function () {
		it("returns new array", function () {
			var array = [1, 2, 3],
				other = array.map(function (num, index, arr) {
					return num;
				});
			expect(isArray(other)).toBe(true);
			expect(other).toNotBe(array);
		});

		it("new array is filled with items returned from callback", function () {
			var array = [1, 2, 3],
				other = array.map(function (num, index, arr) {
					return num * 2;
				});
			expect(other[0]).toBe(2);
			expect(other[1]).toBe(4);
			expect(other[2]).toBe(6);
		});

		it("executes callback once per array element", function () {
			var array = [1, 2, 3];
			array.map(function (num, index, arr) {
				expect(num).toBe(index + 1);
				expect(arr).toBe(array);
			});
		});

		it("passes (element, index, array) to callback", function () {
			var array = [1, 2, 3];
			array.map(function (num, index, arr) {
				expect(num).toBe(arr[index]);
			});
		});

		it("loops 0 to length forwards", function () {
			var array = [1, 2, 3];
			[1, 2, 3].map(function (num, index, arr) {
				expect(num).toBe(array.shift());
			});
		});

		it("executes callback with context passed as second parameter", function () {
			var array = [1, 2, 3],
				context = {};
			array.map(function (num, index, arr) {
				expect(this).toBe(context);
			}, context);
		});
	});

	describe("array.filter(callback, context)", function () {
		it("returns new array", function () {
			var array = [1, 2, 3],
				other = array.filter(function (num, index, arr) {
					return false;
				});
			expect(isArray(other)).toBe(true);
			expect(other).toNotBe(array);
		});

		it("new array is filled with items that produced a truthy response from callback", function () {
			var array = [1, 2, 3],
				other = array.filter(function (num, index, arr) {
					return num > 1;
				});
			expect(other.length).toBe(2);
			expect(other[0]).toBe(2);
			expect(other[1]).toBe(3);
		});

		it("executes callback once per array element", function () {
			var array = [1, 2, 3];
			array.filter(function (num, index, arr) {
				expect(num).toBe(index + 1);
				expect(arr).toBe(array);
			});
		});

		it("passes (element, index, array) to callback", function () {
			var array = [1, 2, 3];
			array.filter(function (num, index, arr) {
				expect(num).toBe(arr[index]);
			});
		});

		it("loops 0 to length forwards", function () {
			var array = [1, 2, 3];
			[1, 2, 3].filter(function (num, index, arr) {
				expect(num).toBe(array.shift());
			});
		});

		it("executes callback with context passed as second parameter", function () {
			var array = [1, 2, 3],
				context = {};
			array.filter(function (num, index, arr) {
				expect(this).toBe(context);
			}, context);
		});
	});

	function isArray (value) {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
});


