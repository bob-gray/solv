define(["src/shim/function"], function () {
	"use strict";

	describe("function.bind(context, nArgs...)", function () {
		it("binds an invocation context to a function", function () {
			var context = {},
				bound = func.bind(context),
				obj = {
					fn: bound
				};
			bound();
			bound.apply({}, []);
			bound.call(obj);
			obj.fn();
			function func () {
				expect(this).toBe(context);
			}
		});

		it("passes preceeding arguments", function () {
			var context = {},
				bound = func.bind(context, 1, 2),
				obj = {
					fn: bound
				};
			bound();
			bound.apply({}, []);
			bound.call(obj);
			obj.fn();
			function func (one, two) {
				expect(this).toBe(context);
				expect(one).toBe(1);
				expect(two).toBe(2);
			}
		});

		it("bound context is only ignored when call with new operator", function () {
			var context = {},
				Bound = Func.bind(context, 1, 2),
				obj = {
					Fn: Bound
				},
				instance = new Bound();
			instance = new obj.Fn();
			function Func (one, two) {
				expect(this).toNotBe(context);
				expect(one).toBe(1);
				expect(two).toBe(2);
				expect(this instanceof Bound).toBe(true);
			}
		});
	});
});

