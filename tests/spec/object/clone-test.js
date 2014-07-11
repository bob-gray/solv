define(["solv/object/clone"], function () {
	"use strict";

	describe("Object.clone", function () {
		var sales,
			bob,
			fred;

		beforeEach(function () {
			sales = {
				staff: []
			};

			bob = {
				name: "Bob",
				title: "Manager",
				dept: sales,
				salary: 90000
			};

			fred = {
				name: "Fred",
				title: "Associate",
				dept: sales,
				manager: bob,
				salary: 50000
			};

			sales.staff.push(bob, fred);
		});

		it("should be circular reference safe", function () {
			var salesCopy = Object.clone(sales);

			expect(salesCopy.staff).toBeDefined();
		});

		it("should create a clone of an object", function () {
			var salesCopy = Object.clone(sales);

			expect(salesCopy.staff.length).toBe(2);
			expect(salesCopy.staff[1].name).toBe("Fred");
		});

		it("should create a clone that is a deep copy", function () {
			var salesCopy = Object.clone(sales);

			expect(salesCopy.staff !== sales.staff).toBe(true);
			expect(salesCopy.staff[0] !== sales.staff[0]).toBe(true);
		});

		it("should create new circular reference in the copy", function () {
			var salesCopy = Object.clone(sales);

			expect(salesCopy.staff[0].dept).toBe(salesCopy);
			expect(salesCopy.staff[1].manager).toBe(salesCopy.staff[0]);
		});
	});
});