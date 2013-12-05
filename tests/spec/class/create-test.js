define(["solv/class"], function (createClass) {
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
		
		it("can have default property values automatically assigned", function () {
			var Person = createClass({
				name: "Person",
				properties: {
					name: {
						type: "string",
						"default": "John Doe"
					},
					hometown: {
						type: "string",
						"default": "unknown"
					}
				}
			});
			
			useClass(Person);
			expect(new Person().name).toBe("John Doe");
			expect(new Person().hometown).toBe("unknown");
		});
		
		it("can have default property values overridden by constructor argument", function () {
			var Person = createClass({
				name: "Person",
				properties: {
					name: {
						type: "string",
						"default": "John Doe"
					},
					hometown: {
						type: "string",
						"default": "unknown"
					}
				},
				"arguments": [{
					name: "properties",
					type: "object"
				}]
			});
			
			useClass(Person);
			expect(new Person({name: "Bob"}).name).toBe("Bob");
		});
		
		it("can have default property values automatically assigned", function () {
			var Person = createClass({
				name: "Person",
				properties: {
					name: {
						type: "string",
						"default": "John Doe"
					},
					hometown: {
						type: "string",
						"default": "unknown"
					}
				}
			});
			
			useClass(Person);
			expect(new Person().name).toBe("John Doe");
			expect(new Person().hometown).toBe("unknown");
		});
		
		it("can have default options values overridden by constructor argument", function () {
			var personInit = jasmine.createSpy("personInit"),
				Person = createClass({
					name: "Person",
					"arguments": [{
						name: "options",
						type: "object",
						"default": {
							name: "John Doe",
							hometown: "unknown"
						}
					}]
				}, personInit),
				person = new Person();
			
			useClass(Person);
			expect(personInit).toHaveBeenCalledWith({
				name: "John Doe",
				hometown: "unknown"
			});
		});
	});

	describe("class constructors created with createClass()", function () {
		it("are injected with class name", function () {
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

		it("init function can call this.superCall or this.superApply", function () {
			var Parent = createClass({
				"name": "Parent"
			}, parentInit);

			var Child = createClass({
				"name": "Child",
				"extends": Parent
			}, childInit);

			function parentInit (name) {
				this.name = name;
			}

			function childInit () {
				this.superApply(arguments);
			}

			useClass(Parent);
			useClass(Child);
			expect(new Parent("Ollie").name).toBe("Ollie");
			expect(new Child("Ollie").name).toBe("Ollie");
		});

		it("throws an error if called without new operator", function () {
			var Foo = createClass();
			expect(Foo).toThrow();
		});
	});

	function useClass (Constructor) {
		expect(typeof Constructor).toBe("function");
		expect(typeof Constructor.prototype).toBe("object");
		expect(new Constructor() instanceof Constructor).toBe(true);
		if (Constructor.Super) {
			expect(Constructor.prototype instanceof Constructor.Super).toBe(true);
		}
	}
});
