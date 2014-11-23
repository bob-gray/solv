define(["solv/regexp/escape"], function () {
	"use strict";

	describe("RegExp.escape", function () {
		it("should escape regular expression meta characters", function () {
			var specials = "-\\^$*+?.()|[]{}",
				escaped = RegExp.escape(specials),
				re = new RegExp("["+ escaped +"]", "g");

			expect(specials.replace(re, "")).toBe("");
		});
	});
});