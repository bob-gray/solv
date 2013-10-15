define(
	[
		"src/abstract/base",
		"src/class"
	],
	function (Base) {
		"use strict";

		describe("Base", function () {
			it("invoke method invokes private methods", function () {
				var base = new Base();

				function set (key, value) {
					expect(this).toBe(base);
					this[key] = value;
				}

				function get (key) {
					expect(this).toBe(base);
					return this[key];
				}

				base.invoke(set, "name", "foo");
				expect(base.name).toBe("foo");
				expect(base.invoke(get, "name")).toBe("foo");
			});

			it("proxy method returns a bound proxy function", function () {
				var base = new Base(),
					callback = base.proxy(test);

				function test () {
					expect(arguments.length).toBe(0);
					expect(this).toBe(base);
				}

				callback();
				expect(typeof callback).toBe("function");
			});

			it("proxy method can accept additional arguments to be applied to the method", function () {
				var base = new Base(),
					callback = base.proxy(set, "name");

				function set (key, value) {
					expect(this).toBe(base);
					this[key] = value;
				}

				callback("foo");
				expect(typeof callback).toBe("function");
				expect(base.name).toBe("foo");
			});

			it("proxy method can be passed a private function", function () {
				var base = new Base(),
					callback = base.proxy(test);

				function test () {
					expect(arguments.length).toBe(0);
					expect(this).toBe(base);
				}

				callback();
				expect(typeof callback).toBe("function");
			});

			it("proxy method can be passed a public method name", function () {
				var base = new Base(),
					callback;

				base.test = function () {
					expect(arguments.length).toBe(1);
					expect(this).toBe(base);
				};

				callback = base.proxy("test");

				callback(null);
				expect(typeof callback).toBe("function");
			});
		});
	}
);

