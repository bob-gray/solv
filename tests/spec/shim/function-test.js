define(["solv/shim/function"], function (functionShims) {
	"use strict";

	var nativeBind;

	function runTests () {
		if (bindIsNotShim()) {
			nativeTests();
		}
		shimTests();
	}

	function nativeTests () {
		describe("function.bind [native]", testBind);
	}

	function shimTests (method) {
		describe("function.bind [shim]", function () {
			beforeEach(injectBindShim);
			afterEach(removeBindShim);
			testBind();
		});
	}

	function injectBindShim () {
		nativeBind = Function.prototype.bind;
		Function.prototype.bind = functionShims.bind;
	}

	function removeBindShim () {
		Function.prototype.bind = nativeBind;
		nativeBind = null;
	}

	function bindIsNotShim () {
		return Function.prototype.bind !== functionShims.bind;
	}

	function testBind () {
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
			bound(3);
			bound.apply({}, [3]);
			bound.call(obj, 3);
			obj.fn(3);
			function func (one, two, three) {
				expect(this).toBe(context);
				expect(one).toBe(1);
				expect(two).toBe(2);
				expect(three).toBe(3);
				expect(arguments.length).toBe(3);
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
	}

	runTests();
});

