define(["solv/event/name"], function (EventName) {
	"use strict";

	describe("EventName", function () {
		it(".expand method expands this.name into all possible event name segments", function () {
			var eventName = new EventName("stocks.tech.google"),
				expanded = eventName.expand();

			expect(expanded).toContain("stocks");
			expect(expanded).toContain("stocks.tech");
			expect(expanded).toContain("stocks.tech.google");
			expect(expanded.length).toBe(3);
		});

		it(".expand method works as expected when this.name is not namespaced", function () {
			var eventName = new EventName("stocks"),
				expanded = eventName.expand();

			expect(expanded).toContain("stocks");
			expect(expanded.length).toBe(1);
		});

		it("EventName accepts a custom delimiter", function () {
			var eventName = new EventName("stocks/tech/google", "/"),
				expanded = eventName.expand();

			expect(expanded).toContain("stocks");
			expect(expanded).toContain("stocks/tech");
			expect(expanded).toContain("stocks/tech/google");
			expect(expanded.length).toBe(3);
		});

		it("EventName accepts a multi-character delimiter", function () {
			var eventName = new EventName("stocks--tech--google", "--"),
				expanded = eventName.expand();

			expect(expanded).toContain("stocks");
			expect(expanded).toContain("stocks--tech");
			expect(expanded).toContain("stocks--tech--google");
			expect(expanded.length).toBe(3);
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

		it(".isNamespaced method tests for the presence of this.delimiter in this.name", function () {
			var eventName = new EventName("stocks.tech");

			expect(eventName.isNamespaced()).toBe(true);
		});

		it(".isNamespaced method return false when this.delimter isn't contained in this.name", function () {
			var eventName = new EventName("stocks/tech"),
				eventName2 = new EventName("stocks");

			expect(eventName.isNamespaced()).toBe(false);
			expect(eventName2.isNamespaced()).toBe(false);
		});

		it(".isNamespaced method works as expected with custom delimter", function () {
			var eventName = new EventName("stocks/tech", "/"),
				notNamespaced = new EventName("stocks.tech.google", "%");

			expect(eventName.isNamespaced()).toBe(true);
			expect(notNamespaced.isNamespaced()).toBe(false);
		});

		it(".isNamespaced method works as expected with multi-character delimter", function () {
			var eventName = new EventName("stocks::tech", "::"),
				notNamespaced = new EventName("stocks.tech.google", "::");

			expect(eventName.isNamespaced()).toBe(true);
			expect(notNamespaced.isNamespaced()).toBe(false);
		});
	});
});