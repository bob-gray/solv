define(["solv/string/contains"], function () {
	"use strict";

	describe("string.contains", function () {
		it("should return true if substring is found in string", function () {
			var string = "  hello world";

			expect(string.contains("hello")).toBe(true);
		});

		it("should return false if substring is not found in string", function () {
			var string = " hello world";

			expect(string.contains("foo")).toBe(false);
		});
	});
});