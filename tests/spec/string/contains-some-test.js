define(["solv/string/contains-some"], function () {
	"use strict";

	describe("string.containsSome", function () {
		it("should return true if some substrings are found in string", function () {
			var string = "  hello world";

			expect(string.containsSome("hello", "foo")).toBe(true);
		});

		it("should return true if every substrings are found in string", function () {
			var string = "  hello world";

			expect(string.containsSome("h", "w")).toBe(true);
		});

		it("should return false if no substrings are found in string", function () {
			var string = " hello world";

			expect(string.containsSome("foo", "bar")).toBe(false);
		});
	});
});