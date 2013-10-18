define(["src/object/merge"], function () {
	"use strict";

	describe("Object.merge", function () {
		it("copies properties to a target object", function () {
			var target = {},
				source = {
					prop1: 1,
					prop2: "two"
				};
			Object.merge(target, source);
			expect(target.prop1).toBe(1);
			expect(target.prop2).toBe("two");
		});

		it("doesn't copy prototype properties - only own properties", function () {
			var foo = new Foo(),
				bar = {};
			foo.own = true;
			function Foo () {}
			Foo.prototype.sayHello = function () {};
			Object.merge(bar, foo);
			expect(bar.own).toBe(true);
			expect(bar.sayHello).toBeUndefined();
		});

		it("gives priority to object properties left to right through the arguments", function () {
			var target = {
					id: 0
				},
				src1 = {
					id: 1
				},
				src2 = {
					id: 2
				},
				src3 = {
					id: 3
				};
			Object.merge(target, src1, src2, src3);
			expect(target.id).toBe(3);
		});

		it("doesn't assign null or undefined values", function () {
			var target = {
					id: 0
				},
				src1 = {
					id: 1
				},
				src2 = {
					id: null
				},
				src3 = {
					id: undefined
				};
			Object.merge(target, src1, src2, src3);
			expect(target.id).toBe(1);
		});
	});
});