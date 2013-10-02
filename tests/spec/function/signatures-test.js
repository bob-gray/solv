define(["src/function/signatures"], function () {
	"use strict";

	describe("Function.compileImplementationSignature(signature)", function () {
		it("returns a regular expression", function () {
			var compiled = Function.compileImplementationSignature("string?,object,any*");
			expect(compiled instanceof RegExp).toBe(true);
		});

		it ("support * 'none or more' meta character", function () {
			var compiled = Function.compileImplementationSignature("boolean,any*");
			expect(compiled.test("boolean,object,object")).toBe(true);
			expect(compiled.test("boolean")).toBe(true);
			expect(compiled.test("object,object")).toBe(false);

			compiled = Function.compileImplementationSignature("string*,array,number*");
			expect(compiled.test("string,string,string,array")).toBe(true);
			expect(compiled.test("array")).toBe(true);
			expect(compiled.test("string,array,number,number")).toBe(true);
			expect(compiled.test("array,string")).toBe(false);
		});

		it("supports + 'one or more' not meta character", function () {
			var compiled = Function.compileImplementationSignature("string,number+");
			expect(compiled.test("string,number,number,number")).toBe(true);
			expect(compiled.test("string,number")).toBe(true);
			expect(compiled.test("string,array")).toBe(false);

			compiled = Function.compileImplementationSignature("string+,number,null+");
			expect(compiled.test("string,number,null")).toBe(true);
			expect(compiled.test("string,string,number,null")).toBe(true);
			expect(compiled.test("string,number,number")).toBe(false);
		});

		it("supports ! 'not' meta character", function () {
			var compiled = Function.compileImplementationSignature("!string,!object");
			expect(compiled.test("object,string")).toBe(true);
			expect(compiled.test("null,number")).toBe(true);
			expect(compiled.test("string,array")).toBe(false);

			compiled = Function.compileImplementationSignature("string,!object,any*");
			expect(compiled.test("string,string")).toBe(true);
			expect(compiled.test("string,number,number")).toBe(true);
			expect(compiled.test("string,object,array")).toBe(false);
		});

		it("supports ! 'group not' meta characters", function () {
			var compiled = Function.compileImplementationSignature("!string,!object|array,any?");
			expect(compiled.test("object,string,array")).toBe(true);
			expect(compiled.test("null,number")).toBe(true);
			expect(compiled.test("array,array")).toBe(false);
		});
	});
});
