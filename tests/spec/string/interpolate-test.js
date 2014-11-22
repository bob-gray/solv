define(["solv/string/interpolate"], function () {
	"use strict";

	describe("string.interpolate", function () {
		it("should replace placeholders with values from the scope", function () {
			var template = "My name is {name}.";

			expect(template.interpolate({name: "Bob"})).toBe("My name is Bob.");
		});

		it("should replace placeholders with values one than once", function () {
			var template = "This is my brother {brother} and my other brother {brother}.";

			expect(template.interpolate({brother: "Darryl"})).toBe("This is my brother Darryl and my other brother Darryl.");
		});

		it("should replace more then one placeholder", function () {
			var template = "I drive a {color} {model}!",
				scope = {
					color: "red",
					model: "Mustang"
				};

			expect(template.interpolate(scope)).toBe("I drive a red Mustang!");
		});

		it("should replace values in a multiline string", function () {
			var template = "username: {username}\npassword: {password}",
				scope = {
					username: "admin",
					password: "secret"
				};

			expect(template.interpolate(scope)).toBe("username: admin\npassword: secret");
		});

		it("should allow custom delimiters", function () {
			var template = "username: ${username}\npassword: ${password}",
				scope = {
					username: "admin",
					password: "secret"
				};

			expect(template.interpolate(scope, "${", "}")).toBe("username: admin\npassword: secret");
		});
	});
});