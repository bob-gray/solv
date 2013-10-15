define(["src/abstract/singleton"], function (Singleton) {
	"use strict";

	describe("Singleton", function () {
		it("has static getInstance method that returns last created instance", function () {
			var instance1 = new Singleton(),
				instance2 = new Singleton(),
				instance3;
			expect(typeof Singleton.getInstance).toBe("function");
			expect(Singleton.getInstance()).toBe(instance2);
			instance3 = new Singleton();
			expect(Singleton.getInstance()).toBe(instance3);
		});

		it("attaches static getInstance to subclasses when constructor is executed", function () {
			var instance;
			function ChildSingleton () {
				Singleton.call(this);
			}
			extendSingleton(ChildSingleton);
			instance = new ChildSingleton();
			expect(typeof ChildSingleton.getInstance).toBe("function");
			expect(ChildSingleton.getInstance()).toBe(instance);
		});

		function extendSingleton (Child) {
			Child.prototype = new Singleton();
			Child.prototype.constructor = Child;
		}
	});
});