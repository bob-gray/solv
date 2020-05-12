define(["solv/function/debounce"], function () {
	"use strict";

	describe("function.debounce", function () {
		var fn;

		beforeEach(function () {
			fn = jasmine.createSpy("fn");
		});

		it("should call function once on trailing edge", function (done) {
			var debounced = fn.debounce(100),
				i = 0;

			for (; i < 50; i += 1) {
				debounced();
			}

			setTimeout(function () {
				expect(fn.calls.count()).toEqual(1);
				done();
			}, 200);
		});

		it("should call function once on leading edge", function (done) {
			var debounced = fn.debounce(100, true),
				i = 0;

			for (; i < 50; i += 1) {
				debounced();
			}

			setTimeout(function () {
				expect(fn.calls.count()).toEqual(1);
				done();
			}, 200);
		});

		it("should call function again after lapse", function (done) {
			var debounced = fn.debounce(20),
				i = 3;

			(function loop () {
				debounced();
				i -= 1;

				if (i) {
					setTimeout(loop, 75);
				}
			}());

			setTimeout(function () {
				expect(fn.calls.count()).toEqual(3);
				done();
			}, 300);
		});
	});
});