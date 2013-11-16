define(
	[
		"src/error/invalid-return-type",
		"src/function/validate-return-type"
	],
	function (InvalidReturnType) {
		"use strict";

		describe("function.validateReturnType(signature|options)", function () {
			it("can be called passing a signature string", function () {
				var getObject = function () {
					return {};
				}.validateReturnType("object|number");
				expect(typeof getObject()).toBe("object");
			});

			it("can be called passing an object", function () {
				var zero = function () {
					return 0;
				};
				zero = zero.validateReturnType({
					functionName: "zero",
					signature: "!string"
				});
				expect(zero()).toBe(0);
			});

			it("returns a function to be called in place of the original function", function () {
				var obj = {},
					getObject = function () {
						return obj;
					};
				getObject = getObject.validateReturnType({
					functionName: "getObject",
					signature: "!null|undefined"
				});
				expect(getObject()).toBe(obj);
			});

			it("returns a function to be called in place of the original function", function () {
				var obj = {},
					getObject = function () {
						return obj;
					};
				getObject = getObject.validateReturnType({
					functionName: "getObject",
					signature: "object"
				});
				expect(getObject()).toBe(obj);
			});

			it("returns a function to be called in place of the original function with the same arguments", function () {
				var times = function (x, y) {
						return x * y;
					};
				times = times.validateReturnType({
					functionName: "times",
					signature: "number"
				});
				expect(times(2, 4)).toBe(8);
			});

			it("returns a function to be called in place of the original function with the same context", function () {
				var obj = {
					name: "Foo",
					getName: function () {
						expect(this).toBe(obj);
						return this.name;
					}
				};
				obj.getName = obj.getName.validateReturnType({
					functionName: "obj.getName",
					signature: "string"
				});
				expect(obj.getName()).toBe(obj.name);
			});

			it("returned function throws error if return type is invalid", function () {
				var zero = function () {
					return 0;
				};
				zero = zero.validateReturnType({
					functionName: "zero",
					signature: "string"
				});
				expect(zero).toThrow();
				try {
					zero();
				} catch (error) {
					expect(error instanceof InvalidReturnType).toBe(true);
				}
			});
		});
	}
);
