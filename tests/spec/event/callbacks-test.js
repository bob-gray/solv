define(["solv/event/callbacks"], function (Callbacks) {
	"use strict";
	
	var callbacks,
		callback;
	
	beforeEach(function () {
		callbacks = new Callbacks();
		callback = jasmine.createSpy("callback");	
	});
	
	describe("Callbacks", function () {
		it(".isEmpty tests if the callback queue is empty", function () {
			expect(callbacks.isEmpty()).toBe(true);
		});

		it(".add method adds a callback", function () {
			callbacks.add(callback);
			expect(callbacks.isEmpty()).toBe(false);
		});

		it(".remove method removes a callback", function () {
			callbacks.add(callback);
			expect(callbacks.isEmpty()).toBe(false);
			
			callbacks.remove(callback);
			expect(callbacks.isEmpty()).toBe(true);
		});

		it(".empty method removes all callbacks", function () {
			callbacks.add(callback);
			callbacks.add(function () {});
			callbacks.add(function () {});
			expect(callbacks.isEmpty()).toBe(false);
			
			callbacks.empty();
			expect(callbacks.isEmpty()).toBe(true);
		});

		it(".execute method calls all callbacks with context and arguments", function () {
			var context = {},
				args = [[], 2, {}, true];
				
			function anotherCallback () {
				expect(context).toBe(this);
			}
			
			callbacks.add(callback);
			callbacks.add(anotherCallback);
			callbacks.execute(context, args);
			
			expect(callback).toHaveBeenCalledWith([], 2, {}, true);
		});

		it(".abort method stop remaining callbacks from being called", function () {
			function anotherCallback () {
				callbacks.abort();
			}
			
			callbacks.add(anotherCallback);
			callbacks.add(callback);
			callbacks.execute({}, []);
			
			expect(callback).not.toHaveBeenCalled();
		});

		it(".abort method stops callbacks during that .execute", function () {
			var anotherCallback = jasmine.createSpy("anotherCallback");
			
			callbacks.abort();
			callbacks.add(anotherCallback);
			callbacks.add(callback);
			callbacks.abort();
			callbacks.execute({}, []);
			
			expect(anotherCallback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalled();
		});

		it(".toArray returns an array of the callbacks queue", function () {
			callbacks.add(callback);
			var array = callbacks.toArray();
			
			expect(array.length).toBe(1);
			expect(array[0]).toBe(callback);
		});
	});
});