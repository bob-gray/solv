define(["solv/function/default-args"], function () {
	"use strict";

	describe("function.defaultArgs", function () {
		var fn;
		
		beforeEach(function () {
			fn = jasmine.createSpy("fn");
		});
		
		it("fills in undefined arguments with defaults", function () {
			var withDefaults = fn.defaultArgs("one", "two", "three");
			withDefaults();
			withDefaults(1, 2);
			expect(fn).toHaveBeenCalledWith("one", "two", "three");
			expect(fn).toHaveBeenCalledWith(1, 2, "three");
		});
		
		if("fills in null arguments with defaults", function () {
			var withDefaults = fn.defaultArgs(true, false);
			withDefaults(null, true);
			withDefaults(false, null);
			expect(fn).toHaveBeenCalledWith(true, true);
			expect(fn).toHaveBeenCalledWith(false, false);
		});
		
		it("default arguments are deep", function () {
			var withDefaults = fn.defaultArgs({
				name: "Bob",
				age: 33,
				nested: {
					one: 1,
					two: 2
				}
			});
			withDefaults({
				age: 50,
				nested: {
					foo: "bar",
					one: "one"
				}
			});
			expect(fn).toHaveBeenCalledWith({
				name: "Bob",
				age: 50,
				nested: {
					foo: "bar",
					one: "one",
					two: 2
				}
			});
		});
		
		it("default array arguments are not merged (top level or as object members)", function () {
			var withDefaults = fn.defaultArgs(["a","b","c"], {
				array: [1, 2, 3]
			});
			withDefaults(["x"], {
				array: [0]
			});
			expect(fn).toHaveBeenCalledWith(["x"], {
				array: [0]
			});
		});
	});
});
