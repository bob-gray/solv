define(["solv/function/constrict"], function () {
	"use strict";

	describe("function.constrict", function () {
		var fn;
		
		beforeEach(function () {
			fn = jasmine.createSpy("fn");
		});
		
		it("slices arguments with positive start", function () {
			var constricted = fn.constrict(1);
			constricted("zero", "one", "two");
			expect(fn).toHaveBeenCalledWith("one", "two");
		});
		
		it("slices arguments with negative start", function () {
			var constricted = fn.constrict(-1);
			constricted("zero", "one", "two");
			expect(fn).toHaveBeenCalledWith("two");
		});
		
		it("slices arguments with positive end", function () {
			var constricted = fn.constrict(0, 2);
			constricted("zero", "one", "two");
			expect(fn).toHaveBeenCalledWith("zero", "one");
		});
		
		it("slices arguments with negative end", function () {
			var constricted = fn.constrict(-2, -1);
			constricted("zero", "one", "two");
			expect(fn).toHaveBeenCalledWith("one");
		});
	});
});