define(["solv/object/for-each"], function () {
	"use strict";

	describe("Object.forEach", function () {
		var bob,
			callback;

		beforeEach(function () {
			function Person (first, last) {
				this.firstName = first;
				this.lastName = last;
			}

			Person.prototype.getName = function () {
				return this.firstName +" "+ this.lastName;
			};

			bob = new Person("Bob", "Gray");
			callback = jasmine.createSpy("callback");
		});

		it("should loop over own properties", function () {
			Object.forEach(bob, callback);

			expect(callback).toHaveBeenCalledWith("Bob", "firstName", bob);
			expect(callback).toHaveBeenCalledWith("Gray", "lastName", bob);
		});

		it("should not loop over inherited properties", function () {
			Object.forEach(bob, callback);

			expect(callback.calls.length).toBe(2);
		});

		it("should call callback with passed in context", function () {
			var context = {};

			Object.forEach(bob, test, context);

			function test () {
				expect(this).toBe(context);
			}
		});
	});
});