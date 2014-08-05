define(["solv/abstract/observable"], function (Observable) {
	"use strict";

	describe("Observable", function () {
		var account,
			handler;
	
		beforeEach(function () {
			handler = jasmine.createSpy("handler");
			account = new Observable();
			account.balance = 100;
		});

		it("should set a value with set method", function () {
			account.set("balance", 0);
			expect(account.balance).toBe(0);
		});

		it("should get a value with get method", function () {
			expect(account.get("balance")).toBe(100);
		});

		it("should emit <property>-change event", function () {
			account.on("balance-change", handler);
			account.set("balance", 150);
			expect(handler).toHaveBeenCalledWith("balance", 100, 150);
		});

		it("should emit change event", function () {
			account.on("change", handler);
			account.set("balance", 150);
			expect(handler).toHaveBeenCalledWith("balance", 100, 150);
		});

		it("should not emit event if set value has not changed", function () {
			account.on("balance-change", handler);
			account.on("change", handler);
			account.set("balance", 100);
			expect(handler.calls.length).toBe(0);
		});
	});
});