define(["solv/event/listeners"], function (Listeners) {
	"use strict";
	
	describe("Listeners", function () {
		var listeners;
		
		beforeEach(function () {
			listeners = new Listeners();
		});
		
		function handler () {}
		
		it(".add method adds a new listener and returns its key", function () {
			var key = listeners.add(5, "change", handler);
			
			expect(key.listenerId).toBeDefined();
		});
		
		it(".get method gets a listener by its key", function () {
			var key = listeners.add(5, "change", handler),
				listener = listeners.get(key);
			
			expect(listener.targetId).toBe(5);
			expect(listener.handler).toBe(handler);
		});
		
		it(".remove method removes a listener by its key", function () {
			var key = listeners.add(5, "change", handler),
				listener = listeners.get(key);
			
			listeners.remove({});
			expect(listener.targetId).toBe(5);
			listeners.remove(key);
			listener = listeners.get(key);
			expect(listener).toBeNull();
		});
		
		it(".remove method removes a listeners by targetId", function () {
			var key1 = listeners.add(5, "change", handler),
				key2 = listeners.add(5, "explode", function () {});
			
			expect(listeners.get(key1)).not.toBeNull();
			expect(listeners.get(key2)).not.toBeNull();
			
			listeners.remove(5);
			
			expect(listeners.get(key1)).toBeNull();
			expect(listeners.get(key2)).toBeNull();
		});
		
		it(".remove method removes a listeners by targetId", function () {
			var key1 = listeners.add(5, "change", handler),
				key2 = listeners.add(5, "explode", function () {});
			
			expect(listeners.get(key1)).not.toBeNull();
			expect(listeners.get(key2)).not.toBeNull();
			
			listeners.remove(5);
			
			expect(listeners.get(key1)).toBeNull();
			expect(listeners.get(key2)).toBeNull();
		});
		
		it(".remove method removes a listeners by targetId and eventName", function () {
			var key1 = listeners.add(5, "change", handler),
				key2 = listeners.add(5, "explode", function () {});
			
			expect(listeners.get(key1)).not.toBeNull();
			expect(listeners.get(key2)).not.toBeNull();
			
			listeners.remove(5, "change");
			
			expect(listeners.get(key1)).toBeNull();
			expect(listeners.get(key2)).not.toBeNull();
		});
	});
});