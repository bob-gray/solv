define(
	[
		"src/function/implementation-not-found",
		"src/function/abstract"
	],
	function (ImplementationNotFound) {
		"use strict";

		describe("Function.Abstract(functionName)", function () {
			it("returns a function", function () {
				var abstract = Function.Abstract("overloadMe");
				expect(typeof abstract).toBe("function");
			});

			it("returns a function that throws an ImplementationNotFound error", function () {
				var abstract = Function.Abstract("overloadMe");
				try {
					abstract();
				} catch (error) {
					expect(error instanceof ImplementationNotFound).toBe(true);
				}
				expect(abstract).toThrow();
			});
		});
	}
);
