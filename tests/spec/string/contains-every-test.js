define(["solv/string/contains-every"], function () {
	"use strict";

	describe("string.containsEvery", function () {
		it("should return true if every substring is found in string", function () {
			var string = "  hello world";

			expect(string.containsEvery("h", "ll", "ld", "wo")).toBe(true);
		});

		it("should return false if some substrings are found in string", function () {
			var string = "  hello world";

			expect(string.containsEvery("h", "w", "z")).toBe(false);
		});

		it("should return false if no substrings are found in string", function () {
			var string = " hello world";

			expect(string.containsEvery("foo", "bar", "baz")).toBe(false);
		});
	});
});