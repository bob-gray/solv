define(["solv/color"], function (Color) {
	"use strict";

	describe("Color constructor", function () {
		it("should accept hex string", function () {
			var black = new Color("#000000");
			expect(black.toString()).toBe("#000000");
		});

		it("should accept hex string without #", function () {
			var black = new Color("000000");
			expect(black.toString()).toBe("#000000");
		});

		it("should accept hex 3 character", function () {
			var black = new Color("#000");
			expect(black.toString()).toBe("#000000");
		});

		it("should accept hex 3 character without #", function () {
			var black = new Color("#000");
			expect(black.toString()).toBe("#000000");
		});

		it("should accept upper and lower characters", function () {
			var magenta = new Color("ff00EE");
			expect(magenta.toString()).toBe("#ff00ee");
		});

		it("should accept rgb object", function () {
			var white = new Color({r:255, g:255, b:255});
			expect(white.toString()).toBe("#ffffff");
		});
	});
});