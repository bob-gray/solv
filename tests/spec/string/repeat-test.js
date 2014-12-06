define(["solv/string/repeat"], function () {
	"use strict";

	describe("string.repeat", function () {
		it("should create a string repeated n times", function () {
			var string = "z";

			expect(string.repeat(3)).toBe("zzz");
		});

		it("should repeat a string longer than 1 character", function () {
			var string = "xo";

			expect(string.repeat(2)).toBe("xoxo");
		});

		it("should create an empty string if repeating an empty string", function () {
			var string = "";

			expect(string.repeat(10)).toBe("");
		});

		it("should create an empty string if count is 0", function () {
			var string = "foo";

			expect(string.repeat(0)).toBe("");
		});
	});
});