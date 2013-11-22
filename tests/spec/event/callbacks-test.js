define(["solv/event/callbacks"], function (Callbacks) {
	"use strict";

	describe("Callbacks", function () {
		it("isEmpty test if the callback queue is empty", function () {
			var callbacks = new Callbacks();
			expect(callbacks.isEmpty()).toBe(true);
		});
	});
});