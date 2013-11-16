define(["src/function/get-name"], function () {
	"use strict";

	describe("function.getName", function () {
		it("gets the name of a function declaration", function () {
			function func () {}
			expect(func.getName()).toBe("func");
		});

		it("gets the name of a name function expression", function () {
			var func = function func () {};
			expect(func.getName()).toBe("func");
		});

		it("returns undefined for an anonymous function expression", function () {
			var anonymous = function () {};
			expect(anonymous.getName()).toBeUndefined();
		});
	});
});
