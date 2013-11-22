define(["solv/shim/object"], function () {
	"use strict";

	describe("Object.keys(obj)", function () {
		it("returns an array", function () {
			var obj = {},
				keys = Object.keys(obj);
			expect(isArray(keys)).toBe(true);
		});

		it("throws when called on a non-object", function () {
			expect(Object.keys).toThrow();
		});

		it("returns the keys of an object's own properties", function () {
			var obj = {
					name: "Bob",
					id: 100
				},
				keys = Object.keys(obj);
			expect(keys.length).toBe(2);
			expect(obj[keys[0]]).toBeDefined();
			expect(obj[keys[1]]).toBeDefined();
		});

		it("returned keys don't include inherited properties", function () {
			var obj = new Bob(),
				keys = Object.keys(obj);
			function Bob () {
				this.name = "Bob";
			}
			Bob.prototype.inherited = true;
			expect(keys.length).toBe(1);
			expect(keys[0]).toBe("name");
			expect(obj[keys[0]]).toBeDefined();
		});
	});

	function isArray (value) {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
});

