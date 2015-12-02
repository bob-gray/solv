define(["solv/event/name"], function (EventName) {
	"use strict";

	describe("EventName", function () {
		it("EventName accepts a custom delimiter", function () {
			var eventName = new EventName("stocks/tech", "/"),
				filtered = eventName.filter([
					"stocks",
					"stocks/tech",
					"stocks/tech/google",
					"stock/google"
				]);

			expect(filtered).toContain("stocks/tech");
			expect(filtered).toContain("stocks/tech/google");
			expect(filtered.length).toBe(2);
		});

		it("EventName accepts a multi-character delimiter", function () {
			var eventName = new EventName("stocks--tech", "--"),
				filtered = eventName.filter([
					"stocks",
					"stocks--tech",
					"stocks--tech--google",
					"stock--google"
				]);

			expect(filtered).toContain("stocks--tech");
			expect(filtered).toContain("stocks--tech--google");
			expect(filtered.length).toBe(2);
		});

		it(".filter method filters an array of event names returning those "+
				"that are under the namespace of this.name", function () {
			var eventName = new EventName("stocks.tech"),
				filtered = eventName.filter([
					"stocks",
					"stocks.tech.google",
					"stocks.tech.yahoo",
					"stocks.tech",
					"stocks.finance",
					"stocks.tech.google.android",
					"stocks.google"
				]);

			expect(filtered).not.toContain("stocks");
			expect(filtered).toContain("stocks.tech.google");
			expect(filtered).toContain("stocks.tech.yahoo");
			expect(filtered).toContain("stocks.tech");
			expect(filtered).not.toContain("stocks.finance");
			expect(filtered).toContain("stocks.tech.google.android");
			expect(filtered).not.toContain("stocks.google");
			expect(filtered.length).toBe(4);
		});

		it(".filter method works as expected with custom delimter", function () {
			var eventName = new EventName("stocks/tech", "/"),
				filtered = eventName.filter([
					"stocks",
					"stocks.tech.google",
					"stocks/tech/yahoo"
				]);

			expect(filtered).not.toContain("stocks");
			expect(filtered).not.toContain("stocks.tech.google");
			expect(filtered).toContain("stocks/tech/yahoo");
			expect(filtered.length).toBe(1);
		});

		it(".filter method works as expected with multi-character delimter", function () {
			var eventName = new EventName("stocks::tech", "::"),
				filtered = eventName.filter([
					"stocks",
					"stocks:tech:google",
					"stocks::tech::yahoo"
				]);

			expect(filtered).not.toContain("stocks");
			expect(filtered).not.toContain("stocks:tech:google");
			expect(filtered).toContain("stocks::tech::yahoo");
			expect(filtered.length).toBe(1);
		});
	});
});