define(["src/function/implementation-not-found"], function (ImplementationNotFound) {
		"use strict";

		describe("ImplementationNotFound", function () {
			it("extends Error", function () {
				var error = new ImplementationNotFound();
				expect(error instanceof Error).toBe(true);
			});

			it("can optionally be passed error details", function () {
				var error = new ImplementationNotFound({
					functionName: "awesome"
				});
				expect(typeof error.message).toBe("string");
			});

			it("generates a meaningful message", function () {
				var error = new ImplementationNotFound({
					functionName: "awesome",
					signature: "string",
					nonMatchingSignatures: [
						"function,object?",
						"!null,number"
					]
				});
				expect(error.message.indexOf("awesome")).toBeGreaterThan(-1);
				expect(error.message.indexOf("string")).toBeGreaterThan(-1);
				expect(error.message.indexOf("function,object?")).toBeGreaterThan(-1);
				expect(error.message.indexOf("!null,number")).toBeGreaterThan(-1);
			});
		});
	}
);