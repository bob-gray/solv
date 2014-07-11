define(["solv/abstract/emitter"], function (Emitter) {
	"use strict";

	describe("Emitter", function () {
		var emitter,
			handler;
	
		beforeEach(function () {
			emitter = new Emitter();
			handler = jasmine.createSpy("handler");
		});

		it("should return a listenerKey from .on", function () {
			var listenerKey = emitter.on("message", handler);
			
			expect(listenerKey).toBeDefined();
		});

		it("should return a listenerKey from .once", function () {
			var listenerKey = emitter.once("message", handler);
			
			expect(listenerKey).toBeDefined();
		});

		it("should execute handler functions when event is triggered", function () {
			emitter.on("message", handler);
			emitter.trigger("message");
	
			expect(handler).toHaveBeenCalled();
		});

		it("should trigger event with options object", function () {
			emitter.on("message", handler);
			emitter.trigger("message");
	
			expect(handler).toHaveBeenCalled();
		});

		it("should pass additional trigger arguments to handler functions", function () {
			emitter.on("message", handler);
			emitter.trigger("message", 1, 2, 3);
	
			expect(handler).toHaveBeenCalledWith(1, 2, 3);
		});

		it("should validate additional arguments with params meta is passed", function () {
			var message = {
					name: "message",
					when: "a message is received",
					params: [{
						name: "status",
						type: "string"
					}, {
						name: "data",
						type: "object",
						required: false
					}]
				},
				data = {};

			emitter.on("message", handler);
			emitter.trigger(message, "success");
			emitter.trigger(message, "success", data);
	
			expect(wrongParams).toThrow();
			expect(handler).toHaveBeenCalledWith("success");
			expect(handler).toHaveBeenCalledWith("success", data);

			function wrongParams () {
				emitter.trigger(message, 1, 2, 3);
			}
		});

		it("should only execute handler function once when added with .once", function () {
			var listenerKey = emitter.once("message", handler);

			emitter.trigger("message");
			expect(handler).toHaveBeenCalled();

			emitter.trigger("message");
			expect(handler.calls.length).toBe(1);
		});

		it("should remove listeners added with .on", function () {
			var listenerKey = emitter.on("message", handler);
			emitter.off(listenerKey);
			emitter.trigger("message");
	
			expect(handler.calls.length).toBe(0);
		});

		it("should remove listeners added with .once", function () {
			var listenerKey = emitter.once("message", handler);
			emitter.off(listenerKey);
			emitter.trigger("message");
	
			expect(handler.calls.length).toBe(0);
		});

		it("should remove listeners by event name", function () {
			emitter.on("message", handler);
			emitter.off("message");
			emitter.trigger("message");
	
			expect(handler.calls.length).toBe(0);
		});

		it("should remove listeners by event name when added with once", function () {
			emitter.once("message", handler);
			emitter.off("message");
			emitter.trigger("message");
	
			expect(handler.calls.length).toBe(0);
		});

		it("should remove all listeners", function () {
			emitter.on("message", handler);
			emitter.off();
			emitter.trigger("message");
	
			expect(handler.calls.length).toBe(0);
		});

		it("should remove all listeners when added with once", function () {
			emitter.once("message", handler);
			emitter.off();
			emitter.trigger("message");
	
			expect(handler.calls.length).toBe(0);
		});

		it("should remove all listeners when more than one listener", function () {
			var listenerKey = emitter.on("message", handler);

			emitter.on("message", handler);
			emitter.once("message", handler);
			emitter.once("top-secret", handler);
			emitter.off();
			emitter.off(listenerKey);
			emitter.trigger("message");
	
			expect(handler.calls.length).toBe(0);
		});
	});
});