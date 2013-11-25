define(["solv/event/listener"], function (Listener) {
	"use strict";
	
	describe("Listener", function () {
		var listener;
	
		beforeEach(setup);
		
		function setup () {
			listener = new Listener(5, "change", handler);
		}
		
		function handler () {}
		
		it("gets an id unique to other listeners", function () {
			var id = listener.id;
			setup();
			expect(id).not.toBe(listener.id);
			id = listener.id;
			setup();
			expect(id).not.toBe(listener.id);
			id = listener.id;
			setup();
			expect(id).not.toBe(listener.id);
		});
		
		it("has properties passed in constructor", function () {
			expect(listener.targetId).toBe(5);
			expect(listener.eventName).toBe("change");
			expect(listener.handler).toBe(handler);
		});
		
		it(".getKey method returns an object with a listenerId"+
				"property equal to listener.id", function () {
			var key = listener.getKey();
			expect(key.listenerId).toBe(listener.id);
		});
	});
});