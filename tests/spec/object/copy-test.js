define(["solv/object/copy"], function () {
	"use strict";

	describe("Object.copy", function () {
		var original,
			copy;

		function Thing () {}
		Thing.prototype.inherited = "property";

		beforeEach(function () {
			original = new Thing();
			original.own = "property";
			original.nested = {
				deep: true
			};
			original.nil = null;
			original.not = undefined;
			copy = Object.copy(original);
		});

		it("should make a copy", function () {
			expect(copy.own).toBe(original.own);
		});

		it("should not make a deep copy", function () {
			expect(copy.nested).toBe(original.nested);
		});

		it("should not copy inherited properties", function () {
			expect("inherited" in copy).toBe(false);
		});

		it("should not copy null properties", function () {
			expect("nil" in copy).toBe(false);
		});

		it("should not copy undefined properties", function () {
			expect("not" in copy).toBe(false);
		});
	});
});