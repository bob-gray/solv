define(["solv/util/bundle"], function (Bundle) {
	"use strict";

	describe("Bundle", function () {
		it("add method should add an item", function () {
			var students = new Bundle();

			students.add({
				id: 1,
				name: "Bob"
			});

			expect(students[1].name).toBe("Bob");
		});

		it("getLength method should return number of items", function () {
			var students = new Bundle();

			expect(students.getLength()).toBe(0);

			students.add({
				id: 1,
				name: "Bob"
			});

			expect(students.getLength()).toBe(1);
		});

		it("add method should replace an existing item", function () {
			var students = new Bundle();

			students.add({
				id: 1,
				name: "Bob"
			});

			students.add({
				id: 1,
				name: "Phil"
			});

			expect(students[1].name).toBe("Phil");
			expect(students.getLength()).toBe(1);
		});

		it("get method should get an item", function () {
			var students = new Bundle();

			students.add({
				id: 1,
				name: "Bob"
			});

			expect(students.get(1).name).toBe("Bob");
		});

		it("should get an item direct dot or bracket notation", function () {
			var students = new Bundle();

			students.add({
				id: 1,
				name: "Bob"
			});

			expect(students[1].name).toBe("Bob");
		});

		it("remove method should remove an item", function () {
			var students = new Bundle();

			students.add({
				id: 1,
				name: "Bob"
			});

			students.remove(1);

			expect(students.getLength()).toBe(0);
		});

		it("remove method should have no impact if bundle excludes item", function () {
			var students = new Bundle();

			students.add({
				id: 1,
				name: "Bob"
			});

			students.remove(2);

			expect(students.getLength()).toBe(1);
		});

		it("should accept identity as a constructor argument", function () {
			var cars = new Bundle("vin");

			cars.add({
				vin: "r45wf4634",
				make: "Ford",
				model: "Focus",
				year: 2003
			});

			expect(cars.r45wf4634.model).toBe("Focus");
		});

		it("includes method should return true when the identity is found", function () {
			var cars = new Bundle("vin");

			cars.add({
				vin: "r45wf4634",
				make: "Ford",
				model: "Focus",
				year: 2003
			});

			expect(cars.includes("r45wf4634")).toBe(true);
		});

		it("includes method should return false when the identity is not found", function () {
			var cars = new Bundle("vin");

			cars.add({
				vin: "r45wf4634",
				make: "Ford",
				model: "Focus",
				year: 2003
			});

			expect(cars.includes("55555555")).toBe(false);
		});

		it("excludes method should return true when the identity is not found", function () {
			var cars = new Bundle("vin");

			cars.add({
				vin: "r45wf4634",
				make: "Ford",
				model: "Focus",
				year: 2003
			});

			expect(cars.excludes("55555555")).toBe(true);
		});

		it("excludes method should return false when the identity is found", function () {
			var cars = new Bundle("vin");

			cars.add({
				vin: "r45wf4634",
				make: "Ford",
				model: "Focus",
				year: 2003
			});

			expect(cars.excludes("r45wf4634")).toBe(false);
		});

		it("should accept items as a constructor argument", function () {
			var students = new Bundle("id", [{
				id: 1,
				name: "Bob"
			}, {
				id: 2,
				name: "Sally"
			}]);

			expect(students.getLength()).toBe(2);
		});

		it("each method should execute callback for each item", function () {
			var students = new Bundle("id", [{
				id: 0,
				name: "Bob"
			}, {
				id: 1,
				name: "Sally"
			}, {
				id: 2,
				name: "Phil"
			}]);

			students.each(function (student, index) {
				expect(student.id).toBe(index);
			});
		});

		it("each method should pass item as callback this context", function () {
			var students = new Bundle("id", [{
				id: 1,
				name: "Bob"
			}]);

			students.each(function (student, index) {
				expect(this).toBe(student);
			});
		});

		it("toArray method should return an array of the items in the bundle", function () {
			var students = new Bundle("id", [{
				id: 1,
				name: "Bob"
			}, {
				id: 2,
				name: "Sally"
			}]);

			expect(students.toArray().pop().name).toBe("Sally");
			expect(students.toArray().length).toBe(2);
		});

		it("ascending static method should sort bundle ascending by identity", function () {
			var students = new Bundle("id", [{
				id: 2,
				name: "Bob"
			}, {
				id: 3,
				name: "Phil"
			}, {
				id: 1,
				name: "Sally"
			}]);

			students.sort(Bundle.ascending);

			students.each(function (student, index) {
				if (index === 0) {
					expect(student.name).toBe("Sally");
				} else if (index === 1) {
					expect(student.name).toBe("Bob");
				} else {
					expect(student.name).toBe("Phil");
				}
			});
		});

		it("descending static method should sort bundle descending by identity", function () {
			var students = new Bundle("id", [{
				id: 1,
				name: "Bob"
			}, {
				id: 3,
				name: "Phil"
			}, {
				id: 2,
				name: "Sally"
			}]);

			students.sort(Bundle.descending);

			students.each(function (student, index) {
				if (index === 0) {
					expect(student.name).toBe("Phil");
				} else if (index === 1) {
					expect(student.name).toBe("Sally");
				} else {
					expect(student.name).toBe("Bob");
				}
			});
		});

		it("reverse method should reverse the sort of the bundle", function () {
			var students = new Bundle("id", [{
				id: 2,
				name: "Bob"
			}, {
				id: 1,
				name: "Phil"
			}, {
				id: 0,
				name: "Sally"
			}]);

			students.reverse();

			students.each(function (student, index) {
				expect(student.id).toBe(index);
			});
		});

		it("map method should return an array of values return from callback", function () {
			var cars = new Bundle("vin", [{
					vin: "r45wf4634",
					make: "Ford",
					model: "Focus",
					year: 2003
				}, {
					vin: "7gwd873ws",
					make: "Kia",
					model: "Sedona",
					year: 2003
				}, {
					vin: "56t9fd73",
					make: "Nissan",
					model: "Sentra",
					year: 2011
				}]),
				makes = cars.map(function (car) {
					return car.make;
				});

			expect(makes.join(",")).toBe("Ford,Kia,Nissan");
		});

		it("filter method should return an array of values filtered from callback", function () {
			var students = new Bundle("id", [{
					id: 1,
					name: "Bob",
					gpa: 3.32
				}, {
					id: 2,
					name: "Sally",
					gpa: 3.8
				}, {
					id: 3,
					name: "Phil",
					gpa: 2.7
				}]),
				honorRoll = students.filter(function () {
					return this.gpa > 3.0;
				});

			expect(honorRoll.getLength()).toBe(2);
		});

		it("every method should return true if callback returns true for every item", function () {
			var students = new Bundle("id", [{
					id: 1,
					name: "Bob",
					gpa: 3.32
				}, {
					id: 2,
					name: "Sally",
					gpa: 3.8
				}, {
					id: 3,
					name: "Phil",
					gpa: 2.7
				}]),
				allPassing = students.every(function () {
					return this.gpa > 1.0;
				});

			expect(allPassing).toBe(true);
		});

		it("every method should return false if callback doesn't return true for every item", function () {
			var students = new Bundle("id", [{
					id: 1,
					name: "Bob",
					gpa: 3.32
				}, {
					id: 2,
					name: "Sally",
					gpa: 3.8
				}, {
					id: 3,
					name: "Phil",
					gpa: 2.7
				}]),
				allHonorRoll = students.every(function () {
					return this.gpa > 3.0;
				});

			expect(allHonorRoll).toBe(false);
		});

		it("some method should return true if callback returns true for some items", function () {
			var students = new Bundle("id", [{
					id: 1,
					name: "Bob",
					gpa: 3.32
				}, {
					id: 2,
					name: "Sally",
					gpa: 3.8
				}, {
					id: 3,
					name: "Phil",
					gpa: 2.7
				}]),
				someHonorRoll = students.some(function () {
					return this.gpa > 3.0;
				});

			expect(someHonorRoll).toBe(true);
		});

		it("some method should return false if callback doesn't return true for some items", function () {
			var students = new Bundle("id", [{
					id: 1,
					name: "Bob",
					gpa: 3.32
				}, {
					id: 2,
					name: "Sally",
					gpa: 3.8
				}, {
					id: 3,
					name: "Phil",
					gpa: 2.7
				}]),
				someFailing = students.some(function () {
					return this.gpa < 1.0;
				});

			expect(someFailing).toBe(false);
		});

		it("empty method should remove all items from bundle", function () {
			var students = new Bundle("id", [{
					id: 1,
					name: "Bob",
					gpa: 3.32
				}, {
					id: 2,
					name: "Sally",
					gpa: 3.8
				}]);

			students.empty();

			expect(students.getLength()).toBe(0);
			expect(students.includes(1)).toBe(false);
			expect(students.includes(2)).toBe(false);
		});

		it("isEmpty method should return true if the bundle contains no items", function () {
			var cars = new Bundle("vin", []);

			expect(cars.isEmpty()).toBe(true);
		});

		it("isEmpty method should return false after an item is added to the bundle", function () {
			var cars = new Bundle("vin", []);

			cars.add({
				vin: 12345,
				make: "Chevy",
				model: "Corvette",
				year: 1969
			});

			expect(cars.isEmpty()).toBe(false);
		});

		it("isEmpty method should return true after empty method is called", function () {
			var cars = new Bundle("vin", [{
				vin: 12345,
				make: "Chevy",
				model: "Corvette",
				year: 1969
			}]);

			cars.empty();

			expect(cars.isEmpty()).toBe(true);
		});

		it("reduce method should return the value of the items reduced to a single value", function () {
			var cars = new Bundle("vin", [{
					vin: 12345,
					make: "Chevy",
					model: "Corvette",
					year: 1969,
					value: 30000
				}, {
					vin: 32573,
					make: "Chevy",
					model: "Pinto",
					year: 1984,
					value: 400
				}]),
				totalValue = cars.reduce(function (total) {
					return total + this.value;
				}, 0);

			expect(totalValue).toBe(30400);
		});
	});
});