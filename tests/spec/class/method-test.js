define(["solv/class/method"], function () {
	"use strict";

	describe("Constructor.method", function () {
		it("attaches a class instance method", function () {
			var Bob = new Person("Bob", 33);
			function Person (name, age) {
				this.name = name;
				this.age = age;
			}
			Person.method("greet", function () {
				return "Hello, I'm "+ this.name +"!";
			});
			expect(Bob.name).toBe("Bob");
			expect(Bob.greet()).toBe("Hello, I'm Bob!");
		});

		it("attaches a class static method", function () {
			function Person (name, age) {
				this.name = name;
				this.age = age;
			}
			Person.method({
				name: "sort",
				static: true
			}, function (a, b) {
				return a.age > b.age ? 1 : -1;
			});
			expect(typeof Person.sort).toBe("function");
		});

		it("attaches a class shim method only if method doesn't already exist", function () {
			var shim = function () {};
			Array.method({
				name: "sort",
				shim: true
			}, shim);
			expect(Array.prototype.sort).not.toBe(shim);
			Array.method({
				name: "fooey",
				shim: true
			}, shim);
			expect(Array.prototype.fooey).toBe(shim);
			delete Array.prototype.fooey;
		});

		it("overrides a class instance method", function () {
			var called,
				override = function () {
					called = true;
				},
				sort = Array.prototype.sort;
			Array.method({
				name: "sort",
				override: true
			}, override);
			expect(Array.prototype.sort).not.toBe(sort);
			[].sort();
			expect(called).toBe(true);
			Array.prototype.sort = sort;
		});

		it("overrides a class static method", function () {
			var called,
				override = function () {
					called = true;
				},
				parse = Date.parse;
			Date.method({
				name: "parse",
				static: true,
				override: true
			}, override);
			expect(Date.parse).not.toBe(parse);
			Date.parse();
			expect(called).toBe(true);
			Date.parse = parse;
		});

		it("overloads a class instance method", function () {
			function Widget (id) {
				this.id = id;
				this.options = {};
			}
			Widget.method("option", function (key, value) {
				this.options[key] = value;
			});
			Widget.method("option", function (key) {
				return this.options[key];
			});
			Widget.method({
				name: "option",
				signature: "object"
			}, function (options) {
				for (var key in options) {
					if (options.hasOwnProperty(key)) {
						this.options[key] = options[key];
					}
				}
			});
			Widget.method("option", function () {
				return this.options;
			});

			var thingy = new Widget(1);
			thingy.option({
				name: "wizbang",
				rating: "awesome"
			});
			thingy.option("state", "chillin");
			expect(thingy instanceof Widget).toBe(true);
			expect(thingy.option()).toBe(thingy.options);
			expect(thingy.option("name")).toBe("wizbang");
			expect(thingy.option("rating")).toBe("awesome");
			expect(thingy.option("state")).toBe("chillin");
		});

		it("overloads a class static method", function () {
			function Person (name, age) {
				this.name = name;
				this.age = age;
			}
			Person.method({
				name: "sort",
				static: true
			}, function (a, b) {
				return a.age > b.age ? 1 : -1;
			});
			Person.method({
				name: "sort",
				static: true
			}, function () {
				throw "Person.sort should be call with 2 arguments";
			});
			var Bob = new Person("Bob", 33),
				Joe = new Person("Joe", 31),
				people = [Bob, Joe];
			people.sort(Person.sort);
			expect(people[0]).toBe(Joe);
			expect(Person.sort).toThrow();
		});

		it("allows return type validation", function () {
			function Person (name, age) {
				this.name = name;
				this.age = age;
			}
			Person.method({
				name: "getAge",
				"returns": "number"
			}, function () {
				return this.age;
			});
			Person.method({
				name: "getName",
				"returns": {
					"type": "string"
				}
			}, function () {
				return this.name;
			});
			var Bob = new Person("Bob", 33);
			expect(Bob.getAge()).toBe(33);
			Bob.age = "";
			expect(Bob.getAge).toThrow();
			expect(Bob.getName()).toBe("Bob");
			Bob.name = null;
			expect(Bob.getName).toThrow();
		});

		it("allows invocation signature validation", function () {
			function Field (name, value) {
				this.name = name;
				this.value = value;
			}
			Field.method({
				name: "val",
				"arguments": [{
					name: "value",
					type: "any"
				}]
			}, function (value) {
				this.value = value;
			});
			Field.method({
				name: "val",
				"arguments": []
			}, function () {
				return this.value;
			});
			var field = new Field("amount", 0);
			expect(field.name).toBe("amount");
			expect(field.value).toBe(0);
			expect(field.val()).toBe(0);
			field.val(100);
			expect(field.val()).toBe(100);
		});

		it("create an abstract instance method", function () {
			var Person = function (name, age) {
					this.name = name;
					this.age = age;
				},
				Bob = new Person("Bob", 33);

			Person.method({
				"name": "greet",
				"abstract": true,
				"arguments": [{
					"name": "salutation",
					"type": "string"
				}],
				"returns": {
					"name": "greeting",
					"type": "string"
				}
			});
			Person.method({
				"name": "beAwesome"
			});
			expect(typeof Bob.greet).toBe("function");
			expect(Bob.greet).toThrow();
			expect(typeof Bob.beAwesome).toBe("function");
			expect(Bob.beAwesome).toThrow();
		});

		it("create an abstract static method", function () {
			function Person (name, age) {
				this.name = name;
				this.age = age;
			}
			Person.method({
				"name": "greet",
				"abstract": true,
				"static": true,
				"arguments": [{
					"name": "salutation",
					"type": "string"
				}],
				"returns": {
					"name": "greeting",
					"type": "string"
				}
			});
			expect(typeof Person.greet).toBe("function");
			expect(Person.greet).toThrow();
		});
	});
});


