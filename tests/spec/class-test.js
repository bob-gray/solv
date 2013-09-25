define(["src/class"], function (createClass) {
	"use strict";

	describe("createClass()", function () {
		it("creates a class constructor", function () {
			var Foo = createClass(function () {
				this.id = 1;
			});
			useClass(Foo);
		});

		it("can be called without params", function () {
			var Foo = createClass();
			useClass(Foo);
		});

		it("can be called without options param", function () {
			var Foo = createClass(function () {});
			useClass(Foo);
		});

		it("can be called without init param", function () {
			var Foo = createClass({
				name: "Foo"
			});
			useClass(Foo);
		});

		it("can be called passing both options and init", function () {
			var Foo = createClass({}, function () {});
			useClass(Foo);
		});
	});

	describe("classes created with createClass()", function () {
		it("can extend a super class", function () {
			var Foo = createClass({
					name: "Foo"
				}, fooInit),
				Bar = createClass({
					"extends": Foo
				});
			function fooInit () {}
			useClass(Foo);
			useClass(Bar);
			expect(new Bar() instanceof Foo).toBe(true);
		});

		it("can be decorated with a mixins object", function () {
			var Foo = createClass({
					name: "Foo"
				}, fooInit),
				mixin = {
					sayHello: function () {
						return "Hello";
					}
				},
				Bar = createClass({
					"extends": Foo,
					"mixins": mixin
				});
			function fooInit () {}
			useClass(Foo);
			useClass(Bar);
			expect(new Bar() instanceof Foo).toBe(true);
			expect(new Bar().sayHello()).toBe("Hello");
		});

		it("can be decorated with a mixins array", function () {
			var Foo = createClass({
					name: "Foo"
				}),
				mixins = [{
					sayHello: function () {
						return "Hello";
					}
				}, {
					getId: function () {
						return this.id;
					}
				}],
				Bar = createClass({
					"extends": Foo,
					"mixins": mixins
				}, initBar);
			function initBar () {
				this.id = 1;
			}
			useClass(Foo);
			useClass(Bar);
			expect(new Bar() instanceof Foo).toBe(true);
			expect(new Bar().sayHello()).toBe("Hello");
			expect(new Bar().getId()).toBe(1);
		});

		it("can be decorated with a mixins class", function () {
			var Foo,
				Bar = createClass();
			Bar.prototype.getId = function () {
				return this.id;
			};
			Foo = createClass({
				name: "Foo",
				mixins: Bar
			}, fooInit);
			function fooInit () {
				this.id = 1;
			}
			useClass(Foo);
			useClass(Bar);
			expect(new Foo().getId()).toBe(1);
		});
	});

	describe("class constructors created with createClass()", function () {
		it("are inject with class name", function () {
			var Foo = createClass({
				name: "Foo"
			}, function () {});
			expect(Foo.toString().indexOf("function Foo")).toBe(0);
		});

		it("invoke init function", function () {
			var Foo = createClass(function () {
					this.id = 1;
				}),
				foo = new Foo();
			useClass(Foo);
			expect(foo.id).toBe(1);
		});

		it("can be called with or with new operator", function () {
			var foo = createClass(),
				fooInstance = foo();
			expect(fooInstance instanceof foo).toBe(true);
		});
	});

	function useClass (Constructor) {
		expect(typeof Constructor).toBe("function");
		expect(typeof Constructor.prototype).toBe("object");
		expect(new Constructor() instanceof Constructor).toBe(true);
	}
});
