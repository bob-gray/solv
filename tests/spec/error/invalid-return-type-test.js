define(["solv/error/invalid-return-type"], function (InvalidReturnType) {
	"use strict";

	describe("InvalidReturnType", function () {
		it("extends Error", function () {
			var error = new InvalidReturnType();
			expect(error instanceof Error).toBe(true);
		});

		it("can optionally be passed error details", function () {
			var error = new InvalidReturnType({
				functionName: "awesome"
			});
			expect(typeof error.message).toBe("string");
		});

		it("generates a meaningful message", function () {
			var error = new InvalidReturnType({
				functionName: "awesome",
				expectedReturnType: "string",
				actualReturnType: "object"
			});
			expect(error.message.indexOf("awesome")).toBeGreaterThan(-1);
			expect(error.message.indexOf("string")).toBeGreaterThan(-1);
			expect(error.message.indexOf("object")).toBeGreaterThan(-1);
		});
	});
});

