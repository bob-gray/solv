define(["solv/event/engine"], function (EventEngine) {
	"use strict";
	
	describe("EventEngine", function () {
		var event,
			target1,
			target2,
			handler1,
			handler2,
			handler3;
	
		beforeEach(function () {
			event = new EventEngine();
			target1 = {};
			target2 = {};
			handler1 = jasmine.createSpy("handler1");
			handler2 = jasmine.createSpy("handler2");
			handler3 = jasmine.createSpy("handler3");
		});

		it(".addListener method adds a listener to a target", function () {
			event.addListener(target1, "idle", handler1);
			event.trigger(target1, "idle");
			
			expect(handler1).toHaveBeenCalled();
		});

		it(".addListenerOnce method adds a listener to a target "+
				"that only executes once", function () {
			event.addListenerOnce(target1, "idle", handler1);
			
			event.trigger(target1, "idle");
			event.trigger(target1, "idle");
			event.trigger(target1, "idle");
			
			expect(handler1.calls.length).toBe(1);
		});

		it(".remove method removes listeners added with .addListenerOnce", function () {
			var listener = event.addListenerOnce(target1, "idle", handler1);
			
			event.removeListener(target1, listener);
			
			event.trigger(target1, "idle");
			event.trigger(target1, "idle");
			
			expect(handler1).not.toHaveBeenCalled();
		});

		it(".removeListener method removes a listener from a target", function () {
			var listener1 = event.addListener(target1, "idle", handler1),
				listener2 = event.addListener(target2, "changed", handler2),
				listener3 = event.addListener(target1, "changed", handler3);
			
			event.removeListener(target1, listener1);
			event.removeListener(target1, {});
			event.removeListener(target2, listener2);
			event.removeListener(target2, listener2);
			event.removeListener({}, listener2);

			event.trigger(target1, "idle");
			event.trigger(target1, "changed");
			event.trigger(target2, "changed");
			
			expect(handler1).not.toHaveBeenCalled();
			expect(handler2).not.toHaveBeenCalled();
			expect(handler3).toHaveBeenCalled();
		});

		it(".removeListeners method removes a listener from a target "+
				"that only executes once", function () {
			event.addListener(target1, "idle", handler1);
			event.addListener(target1, "idle", handler2);
			event.addListener(target1, "idle", handler3);
			
			event.removeListeners(target1, "idle");
			event.removeListeners(target1, "idle");
			event.removeListeners(target1, "foo");
			event.removeListeners({}, "foo");
			
			event.trigger(target1, "idle");
			event.trigger(target1, "idle");
			
			expect(handler1).not.toHaveBeenCalled();
			expect(handler2).not.toHaveBeenCalled();
			expect(handler3).not.toHaveBeenCalled();
		});

		it(".removeAllListeners method removes a listener from a target "+
				"that only executes once", function () {
			event.addListener(target1, "idle", handler1);
			event.addListener(target2, "idle", handler2);
			event.addListener(target1, "changed", handler2);
			event.addListener(target1, "explode", handler3);
			
			event.removeAllListeners(target1);
			event.removeAllListeners(target2);
			event.removeAllListeners(target2);
			event.removeAllListeners({});
			
			event.trigger(target1, "idle");
			event.trigger(target2, "idle");
			event.trigger(target1, "changed");
			event.trigger(target1, "changed");
			event.trigger(target1, "explode");
			
			expect(handler1).not.toHaveBeenCalled();
			expect(handler2).not.toHaveBeenCalled();
			expect(handler3).not.toHaveBeenCalled();
		});
		
		it(".trigger method fires handlers with a target as context "+
				"and passing additional arguments", function () {
			event.addListener(target1, "idle", handler1);
			event.trigger(target1, "idle", 1, "two", false);
			expect(handler1).toHaveBeenCalledWith(1, "two", false);
			
			handler2 = handler2.andCallFake(function () {
				expect(this).toBe(target2);
			});
			
			event.addListener(target2, "changed", handler2);
			event.trigger(target2, "changed", true, [], false);
			expect(handler2).toHaveBeenCalledWith(true, [], false);
		});
	});
});