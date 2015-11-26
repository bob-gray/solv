define(["solv/object/shim"], function (objectShims) {
	"use strict";

	var nativeMethods = {};

	function runTests (method) {
		if (objectMethodIsNotShim(method)) {
			nativeTests(method);
		}
		shimTests(method);
	}

	function objectMethodIsNotShim (method) {
		return Object[method] !== objectShims[method];
	}

	function nativeTests (method) {
		describe("Object."+ method +" [native]", function () {
			tests[method]();
		});
	}

	function shimTests (method) {
		describe("Object."+ method +" [shim]", function () {
			beforeEach(function () {
				injectObjectShim(method);
			});
			afterEach(function () {
				removeObjectShim(method);
			});
			tests[method]();
		});
	}

	function injectObjectShim (method) {
		nativeMethods[method] = Object[method];
		Object[method] = objectShims[method];
	}

	function removeObjectShim (method) {
		Object[method] = nativeMethods[method];
		nativeMethods[method] = null;
	}

	function isArray (value) {
		return Object.prototype.toString.call(value) === "[object Array]";
	}

	var tests = {
		keys: function () {
			it("returns an array", function () {
				var obj = {},
					keys = Object.keys(obj);
				expect(isArray(keys)).toBe(true);
			});

			it("throws when called on a non-object", function () {
				expect(Object.keys).toThrow();
			});

			it("returns the keys of an object's own properties", function () {
				var obj = {
						name: "Bob",
						id: 100
					},
					keys = Object.keys(obj);
				expect(keys.length).toBe(2);
				expect(obj[keys[0]]).toBeDefined();
				expect(obj[keys[1]]).toBeDefined();
			});

			it("returned keys don't include inherited properties", function () {
				function Bob () {
					this.name = "Bob";
				}
				Bob.prototype.inherited = true;

				var obj = new Bob(),
					keys = Object.keys(obj);

				expect(keys.length).toBe(1);
				expect(keys[0]).toBe("name");
				expect(obj[keys[0]]).toBeDefined();
			});
		},

		create: function () {
			it("creates an object", function () {
				var obj = Object.create({});
				expect(obj instanceof Object).toBe(true);
			});

			it("creates an object with a given prototype", function () {
				var parent = {
						lastName: "Gray"
					},
					child = Object.create(parent);
				expect(child.lastName).toBe("Gray");
			});
		}
	};

	for (var method in objectShims) {
		if (objectShims.hasOwnProperty(method)) {
			runTests(method);
		}
	}
});

