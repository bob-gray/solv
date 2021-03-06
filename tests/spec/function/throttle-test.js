define(["solv/function/throttle"], function () {
	"use strict";

	describe("function.throttle", function () {
		var fn;

		beforeEach(function () {
			fn = jasmine.createSpy("fn");
		});

		it("should call function once every in elapsed buffer", function () {
			var throttled = fn.throttle(100),
				i = 0;

			for (; i < 50; i += 1) {
				throttled();
			}

			expect(fn.calls.count()).toEqual(1);
		});

		it("should call function each time buffer is elapsed", function (done) {
			var throttled = fn.throttle(100),
				i = 6;

			(function loop () {
				throttled();
				i -= 1;

				if (i) {
					setTimeout(loop, 20);
				}
			}());

			setTimeout(function () {
				expect(fn.calls.count()).toEqual(2);
				done();
			}, 200);
		});
	});
});