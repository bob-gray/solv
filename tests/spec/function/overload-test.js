define(["src/function/overload"], function () {
	"use strict";

	describe("function.overload(signature, implementation)", function () {
		it("returns a new function to be called in place of the original function", function () {
			var obj = {
				prop: function (key) {
					return this[key];
				}
			};
			obj.prop = obj.prop.overload("string, any", function (key, value) {
				this[key] = value;
			});
			expect(obj.prop("name")).toBeUndefined();
			obj.prop("name", "foo");
			expect(obj.prop("name")).toBe("foo");
		});

		it("returns a new function decides whether to execute the new implementation passed on the signature", function () {
			var one = function (a) {
				return 1;
			};
			function two (a, b) {
				return a;
			}
			one = one.overload("string,number", two);
			expect(one()).toBe(1);
			expect(one("exec two", 5)).toBe("exec two");
		});
	});

	describe("function.overload(implementation)", function () {
		it("returns a new function to be called in place of the original function", function () {
			var obj = {
				prop: function (key) {
					return this[key];
				}
			};
			obj.prop = obj.prop.overload(function (key, value) {
				obj[key] = value;
			});
			expect(obj.prop("name")).toBeUndefined();
			obj.prop("name", "foo");
			expect(obj.prop("name")).toBe("foo");
		});

		it("returns a new function decides whether to execute the new implementation passed on the signature", function () {
			var f = function (a) {
				return "one";
			};
			f = f.overload(function (a, b) {
				return "two";
			});
			expect(f(1)).toBe("one");
			expect(f("", null)).toBe("two");
		});
	});
});
