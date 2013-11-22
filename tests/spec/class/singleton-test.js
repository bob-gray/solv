define(["solv/class/singleton"], function () {
	"use strict";

	describe("Constructor.singleton", function () {
		it("returns a class instance", function () {
			function Class () {}
			expect(Class.singleton() instanceof Class).toBe(true);
		});

		it("always returns the same instance", function () {
			function Class () {}
			expect(Class.singleton()).toBe(Class.singleton());
			expect(Class.singleton()).toBe(Class.singleton());
			expect(Class.singleton()).toBe(Class.singleton());
		});

		it("forwards arguments to Constructor when building instance", function () {
			var args;
			function Class () {
				args = arguments;
			}
			Class.singleton(1, 2, null, true);
			expect(args.length).toBe(4);
			expect(args[0]).toBe(1);
			expect(args[1]).toBe(2);
			expect(args[2]).toBeNull();
			expect(args[3]).toBe(true);
		});

		it("ignores arguments when singleton instance is already created", function () {
			var args;
			function Class () {
				args = arguments;
			}
			Class.singleton();
			Class.singleton(1, 2, null, true);
			expect(args.length).toBe(0);
		});
	});
});

