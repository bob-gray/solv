define(["src/class"], function (createClass) {
	"use strict";

	describe("createClass", function () {
		var Foo = createClass(function () {
				this.id = 1;
			});
		it("creates a class constructor", function () {
			expect(typeof Foo).toBe("function");
			expect(typeof Foo.prototype).toBe("object");
		});
		it("can be called or without either optional params (options, init)", function () {
			var Bar = createClass(),
				Hello = createClass({
					name: "Bar"
				});
			expect(typeof Bar).toBe("function");
			expect(typeof Bar.prototype).toBe("object");
			expect(typeof Hello).toBe("function");
			expect(typeof Hello.prototype).toBe("object");
		});
		it("invokes passed in init function", function () {
			var foo = new Foo();
			expect(foo.id).toBe(1);
		});
		it("allows new to be optional", function () {
			var bar = createClass(),
				barInstance = bar();
			expect(barInstance instanceof bar).toBe(true);
		});
	});
});
