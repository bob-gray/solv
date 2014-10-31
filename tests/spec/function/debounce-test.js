define(["solv/function/debounce"], function () {
	"use strict";

	describe("function.debounce", function () {
		var fn;
		
		beforeEach(function () {
			fn = jasmine.createSpy("fn");
		});
		
		it("should call function once on trailing edge", function () {
			runs(function() {
				var debounced = fn.debounce(100),
					i = 0;

				for (; i < 50; i += 1) {
					debounced();
				}
			});

			waitsFor(function () {
				return fn.wasCalled;
			}, "Debounced function should be called", 200);

			runs(function () {
				expect(fn.callCount).toEqual(1);
			});
		});

		it("should call function once on leading edge", function () {
			runs(function() {
				var debounced = fn.debounce(100, true),
					i = 0;

				for (; i < 50; i += 1) {
					debounced();
				}
			});

			waitsFor(function () {
				return fn.wasCalled;
			}, "Debounced function should be called", 200);

			runs(function () {
				expect(fn.callCount).toEqual(1);
			});
		});

		it("should call function again after lapse", function () {
			runs(function() {
				var debounced = fn.debounce(10),
					i = 0;

				for (; i < 3; i += 1) {
					setTimeout(debounced, i * 50);
				}
			});

			waitsFor(function () {
				return fn.callCount === 3;
			}, "Debounced function should be called", 200);

			runs(function () {
				expect(fn.callCount).toEqual(3);
			});
		});
	});
});