define(["solv/abstract/base"], function (Base) {
	"use strict";

	describe("Base", function () {
		it("invoke method invokes private methods", function () {
			var base = new Base();

			function test () {
				expect(arguments.length).toBe(0);
				return this;
			}

			expect(base.invoke(test)).toBe(base);
		});

		it("invoke method can accept additional arguments to be applied to the method", function () {
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

		it("delay method can be passed a public method name", function () {
			var base = new Base();

			base.test = jasmine.createSpy("test");

			runs(function () {
				base.delay("test", 1, "foo");
			});

			waitsFor(function () {
				return base.test.calls.length > 0;
			}, "test should be called", 750);

			runs(function () {
				expect(base.test).toHaveBeenCalledWith(1, "foo");
			});
		});

		it("delay method can be passed a private function", function () {
			var base = new Base(),
				callback = jasmine.createSpy("test");

			runs(function () {
				base.delay(callback, 1, "foo");
			});

			waitsFor(function () {
				return callback.calls.length > 0;
			}, "callback should be called", 750);

			runs(function () {
				expect(callback).toHaveBeenCalledWith(1, "foo");
			});
		});

		it("delay method can be passed a wait time", function () {
			var base = new Base(),
				tick = new Date().getTime(),
				wait = 250;

			base.test = jasmine.createSpy("test");

			runs(function () {
				base.delay(wait, "test", 1, "foo");
			});

			waitsFor(function () {
				return base.test.calls.length > 0;
			}, "test should be called", 1000);

			runs(function () {
				var after = new Date().getTime();

				expect(base.test).toHaveBeenCalledWith(1, "foo");
				expect(after - tick).toBeGreaterThan(wait);
			});
		});

		it("debounce method should return a debounce method", function () {
			var base = new Base();

			base.test = jasmine.createSpy("test");

			runs(function () {
				var debounced = base.debounce("test", 100),
					i = 0;

				for (; i < 50; i += 1) {
					debounced();
				}
			});

			waitsFor(function () {
				return base.test.wasCalled;
			}, "base.test should be called", 200);

			runs(function () {
				expect(base.test.callCount).toEqual(1);
			});
		});

		it("debounce method return should be invoked with instance as context", function () {
			var base = new Base();

			base.test = jasmine.createSpy("test");

			runs(function () {
				var debounced = base.debounce("test", 100),
					i = 0;

				for (; i < 50; i += 1) {
					debounced();
				}
			});

			waitsFor(function () {
				return base.test.wasCalled;
			}, "base.test should be called", 200);

			runs(function () {
				expect(base.test.calls[0].object).toEqual(base);
			});
		});

		it("debounce method should return a debounce method when passed a function", function () {
			var base = new Base(),
				test = jasmine.createSpy("test");

			runs(function () {
				var debounced = base.debounce(test, 100),
					i = 0;

				for (; i < 50; i += 1) {
					debounced();
				}
			});

			waitsFor(function () {
				return test.wasCalled;
			}, "base.test should be called", 200);

			runs(function () {
				expect(test.callCount).toEqual(1);
			});
		});

		it("debounce method, when passed a function, return should be invoked with instance as context", function () {
			var base = new Base(),
				test = jasmine.createSpy("test");

			runs(function () {
				var debounced = base.debounce(test, 100),
					i = 0;

				for (; i < 50; i += 1) {
					debounced();
				}
			});

			waitsFor(function () {
				return test.wasCalled;
			}, "base.test should be called", 200);

			runs(function () {
				expect(test.calls[0].object).toEqual(base);
			});
		});
	});
});