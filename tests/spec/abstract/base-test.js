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

		it("delay method can be passed a public method name", function (done) {
			var base = new Base();

			base.test = jasmine.createSpy("test");
			base.delay("test", 1, "foo");

			setTimeout(function () {
				expect(base.test).toHaveBeenCalledWith(1, "foo");
				done();
			}, 30);
		});

		it("delay method can be passed a private function", function (done) {
			var base = new Base(),
				callback = jasmine.createSpy("test");

			base.delay(callback, 1, "foo");

			setTimeout(function () {
				expect(callback).toHaveBeenCalledWith(1, "foo");
				done();
			}, 30);
		});

		it("delay method can be passed a wait time", function (done) {
			var base = new Base(),
				tick = new Date().getTime(),
				wait = 250;

			base.test = jasmine.createSpy("test");
			base.delay(wait, "test", 1, "foo");
			base.delay(wait + 200, "test", 1, "foo");

			setTimeout(function () {
				var after = new Date().getTime();

				expect(base.test).toHaveBeenCalledWith(1, "foo");
				expect(after - tick).toBeGreaterThan(wait);
				done();
			}, wait + 50);
		});

		it("debounce method should return a debounce method", function (done) {
			var base = new Base(),
				debounced,
				i = 0;

			base.test = jasmine.createSpy("test");
			debounced = base.debounce("test", 100);

			for (; i < 50; i += 1) {
				debounced();
			}

			setTimeout(function () {
				expect(base.test.calls.count()).toEqual(1);
				done();
			}, 150);
		});

		it("debounce method return should be invoked with instance as context", function (done) {
			var base = new Base(),
				debounced,
				i = 0;

			base.test = jasmine.createSpy("test");
			debounced = base.debounce("test", 100);

			for (; i < 50; i += 1) {
				debounced();
			}

			setTimeout(function () {
				expect(base.test.calls.first().object).toEqual(base);
				done();
			}, 150);
		});

		it("debounce method should return a debounce method when passed a function", function (done) {
			var base = new Base(),
				test = jasmine.createSpy("test"),
				debounced,
				i = 0;

			debounced = base.debounce(test, 100);

			for (; i < 50; i += 1) {
				debounced();
			}

			setTimeout(function () {
				expect(test.calls.count()).toEqual(1);
				done();
			}, 150);
		});

		it("debounce method, when passed a function, return should be invoked with instance as context", function (done) {
			var base = new Base(),
				test = jasmine.createSpy("test"),
				debounced,
				i = 0;

			debounced = base.debounce(test, 100);

			for (; i < 50; i += 1) {
				debounced();
			}

			setTimeout(function () {
				expect(test.calls.first().object).toEqual(base);
				done();
			}, 150);
		});

		it("throttle method return should call function each time buffer is elapsed", function (done) {
			var base = new Base(),
				throttled,
				i = 0;

			base.test = jasmine.createSpy("test");
			throttled = base.throttle("test", 50);

			for (; i < 4; i += 1) {
				setTimeout(loop, i * 30);
			}

			function loop () {
				throttled();
				i -= 1;
			}

			setTimeout(function () {
				expect(base.test.calls.count()).toEqual(2);
				done();
			}, 150);
		});

		it("throttle method return should be invoked with instance as context", function (done) {
			var base = new Base(),
				throttled,
				i = 0;

			base.test = jasmine.createSpy("test");
			throttled = base.throttle("test", 50);

			for (; i < 4; i += 1) {
				setTimeout(loop, i * 30);
			}

			function loop () {
				throttled();
				i -= 1;
			}

			setTimeout(function () {
				expect(base.test.calls.first().object).toEqual(base);
				done();
			}, 150);
		});

		it("throttle method, when passed a function, return should call function each time buffer is elapsed", function (done) {
			var base = new Base(),
				throttled,
				i = 0,
				test = jasmine.createSpy("test");

			throttled = base.throttle(test, 50);

			for (; i < 4; i += 1) {
				setTimeout(loop, i * 30);
			}

			function loop () {
				throttled();
				i -= 1;
			}

			setTimeout(function () {
				expect(test.calls.count()).toEqual(2);
				done();
			}, 150);
		});

		it("throttle method, when passed a function, return should be invoked with instance as context", function (done) {
			var base = new Base(),
				throttled,
				i = 0,
				test = jasmine.createSpy("test");

			throttled = base.throttle(test, 50);

			for (; i < 4; i += 1) {
				setTimeout(loop, i * 30);
			}

			function loop () {
				throttled();
				i -= 1;
			}

			setTimeout(function () {
				expect(test.calls.first().object).toEqual(base);
				done();
			}, 150);
		});
	});
});