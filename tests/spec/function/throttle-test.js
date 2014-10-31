define(["solv/function/throttle"], function () {
	"use strict";

	describe("function.throttle", function () {
		var fn;
		
		beforeEach(function () {
			fn = jasmine.createSpy("fn");
		});
		
		it("should call function once every in elapsed buffer", function () {
			runs(function() {
				var throttled = fn.throttle(100),
					i = 0;

				for (; i < 50; i += 1) {
					throttled();
				}
			});

			waitsFor(function () {
				return fn.wasCalled;
			}, "throttled function should be called", 200);

			runs(function () {
				expect(fn.callCount).toEqual(1);
			});
		});

		it("should call function each time buffer is elapsed", function () {
			var throttled = fn.throttle(50),
				i = 0;

			runs(function() {
				for (; i < 4; i += 1) {
					setTimeout(loop, i * 30);
				}
			});

			function loop () {
				throttled();
				i -= 1;
			}

			waitsFor(function () {
				return i === 0;
			}, "throttled function should be called", 300);

			runs(function () {
				expect(fn.callCount).toEqual(2);
			});
		});
	});
});