define(["solv/event/engine"], function (EventEngine) {
	"use strict";

	describe("EventEngine", function () {
		var eventEngine,
			target1,
			target2,
			handler1,
			handler2,
			handler3;

		beforeEach(function () {
			eventEngine = new EventEngine();
			target1 = {};
			target2 = {};
			handler1 = jasmine.createSpy("handler1");
			handler2 = jasmine.createSpy("handler2");
			handler3 = jasmine.createSpy("handler3");
		});

		it(".addListener method adds a listener to a target", function () {
			eventEngine.addListener(target1, "idle", handler1);
			eventEngine.trigger(target1, "idle");

			expect(handler1).toHaveBeenCalled();
		});

		it(".addListenerOnce method adds a listener to a target "+
				"that only executes once", function () {
			eventEngine.addListenerOnce(target1, "idle", handler1);

			eventEngine.trigger(target1, "idle");
			eventEngine.trigger(target1, "idle");
			eventEngine.trigger(target1, "idle");

			expect(handler1.calls.length).toBe(1);
		});

		it(".addListener method can listen to all events when eventName=*", function () {
			eventEngine.addListener(target1, "*", handler1);

			eventEngine.trigger(target1, "idle");
			eventEngine.trigger(target2, "idle");
			eventEngine.trigger(target1, "changed");
			eventEngine.trigger(target1, "changed");
			eventEngine.trigger(target1, "explode");

			expect(handler1.calls.length).toBe(4);
		});

		it(".addListenerOnce method adds a listener "+
				"that only executes once on the next event when eventName=*", function () {
			eventEngine.addListenerOnce(target1, "*", handler1);

			eventEngine.trigger(target1, "idle");
			eventEngine.trigger(target2, "idle");
			eventEngine.trigger(target1, "changed");

			expect(handler1.calls.length).toBe(1);
		});

		it(".addListener method can request an event arg to be passed to the handler", function () {
			eventEngine.addListener(target1, "*", handler1, true);

			eventEngine.trigger(target1, "idle");
			eventEngine.trigger(target1, "changed");
			eventEngine.trigger(target1, "explode");

			expect(handler1.calls[0].args[0].name).toBe("idle");
			expect(handler1.calls[1].args[0].name).toBe("changed");
			expect(handler1.calls[2].args[0].name).toBe("explode");
		});

		it(".addListener method can request an event arg to be passed to the handler", function () {
			eventEngine.addListener(target1, "*", cancel, true);
			eventEngine.addListener(target1, "*", handler1, true);

			eventEngine.trigger(target1, "changed");

			expect(handler1).not.toHaveBeenCalled();

			function cancel (event) {
				event.cancel();
			}
		});

		it(".remove method removes listeners added with .addListenerOnce", function () {
			var listener = eventEngine.addListenerOnce(target1, "idle", handler1);

			eventEngine.removeListener(target1, listener);

			eventEngine.trigger(target1, "idle");
			eventEngine.trigger(target1, "idle");

			expect(handler1).not.toHaveBeenCalled();
		});

		it(".removeListener method removes a listener from a target", function () {
			var listener1 = eventEngine.addListener(target1, "idle", handler1),
				listener2 = eventEngine.addListener(target2, "changed", handler2),
				listener3 = eventEngine.addListener(target1, "changed", handler3);

			eventEngine.removeListener(target1, listener1);
			eventEngine.removeListener(target1, {});
			eventEngine.removeListener(target2, listener2);
			eventEngine.removeListener(target2, listener2);
			eventEngine.removeListener({}, listener2);

			eventEngine.trigger(target1, "idle");
			eventEngine.trigger(target1, "changed");
			eventEngine.trigger(target2, "changed");

			expect(handler1).not.toHaveBeenCalled();
			expect(handler2).not.toHaveBeenCalled();
			expect(handler3).toHaveBeenCalled();
		});

		it(".removeListeners method removes a listener from a target "+
				"that only executes once", function () {
			eventEngine.addListener(target1, "idle", handler1);
			eventEngine.addListener(target1, "idle", handler2);
			eventEngine.addListener(target1, "idle", handler3);

			eventEngine.removeListeners(target1, "idle");
			eventEngine.removeListeners(target1, "idle");
			eventEngine.removeListeners(target1, "foo");
			eventEngine.removeListeners({}, "foo");

			eventEngine.trigger(target1, "idle");
			eventEngine.trigger(target1, "idle");

			expect(handler1).not.toHaveBeenCalled();
			expect(handler2).not.toHaveBeenCalled();
			expect(handler3).not.toHaveBeenCalled();
		});

		it(".removeAllListeners method removes a listener from a target "+
				"that only executes once", function () {
			eventEngine.addListener(target1, "idle", handler1);
			eventEngine.addListener(target2, "idle", handler2);
			eventEngine.addListener(target1, "changed", handler2);
			eventEngine.addListener(target1, "explode", handler3);

			eventEngine.removeAllListeners(target1);
			eventEngine.removeAllListeners(target2);
			eventEngine.removeAllListeners(target2);
			eventEngine.removeAllListeners({});

			eventEngine.trigger(target1, "idle");
			eventEngine.trigger(target2, "idle");
			eventEngine.trigger(target1, "changed");
			eventEngine.trigger(target1, "changed");
			eventEngine.trigger(target1, "explode");

			expect(handler1).not.toHaveBeenCalled();
			expect(handler2).not.toHaveBeenCalled();
			expect(handler3).not.toHaveBeenCalled();
		});

		it(".trigger method fires handlers with a target as context "+
				"and passing additional arguments", function () {
			eventEngine.addListener(target1, "idle", handler1);
			eventEngine.trigger(target1, "idle", 1, "two", false);
			expect(handler1).toHaveBeenCalledWith(1, "two", false);

			handler2 = handler2.andCallFake(function () {
				expect(this).toBe(target2);
			});

			eventEngine.addListener(target2, "changed", handler2);
			eventEngine.trigger(target2, "changed", true, [], false);
			expect(handler2).toHaveBeenCalledWith(true, [], false);
		});

		it(".trigger method can be call with options object", function () {
			var options = {
					name: "load",
					when: "data is finished loading"
				},
				status = "LOADED",
				msg = "data has been loaded";

			eventEngine.addListener(target1, "load", handler1);
			eventEngine.trigger(target1, options, status, msg);

			expect(handler1).toHaveBeenCalledWith(status, msg);
		});

		it(".trigger method can be call with param object for validating params", function () {
			var options = {
					name: "load",
					params: {
						status: {
							type: "string",
							required: false
						},
						msg: "string"
					}
				},
				params = {
					status: "LOADED",
					msg: "data has been loaded"
				};

			eventEngine.addListener(target1, "load", handler1);
			eventEngine.trigger(target1, options, params);

			expect(handler1).toHaveBeenCalledWith(params);
		});

		it(".trigger method can be call with param array for validating params", function () {
			var options = {
					name: "load",
					params: [{
						name: "status",
						type: "string",
						required: false
					}, {
						name: "msg",
						type: "string"
					}]
				};

			eventEngine.addListener(target1, "load", handler1);
			eventEngine.trigger(target1, options, "LOADED", "data has been loaded");

			expect(handler1).toHaveBeenCalledWith("LOADED", "data has been loaded");
		});

		it(".trigger method throws error when triggering event with invalid params", function () {
			var options = {
					name: "load",
					params: [{
						name: "status",
						type: "string"
					}, {
						name: "msg",
						type: "string"
					}]
				};

			function badTrigger () {
				eventEngine.trigger(target1, options, "LOADED");
			}

			expect(badTrigger).toThrow();
		});
	});
});