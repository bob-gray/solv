define(["solv/object/validate"], function () {
	"use strict";

	describe("Object.validate", function () {
		var vehicle;

		beforeEach(function () {
			vehicle = {
				make: "Ford",
				model: "Thunderbird",
				year: 1981,
				rwd: true,
				options: [
					"ac",
					"power steering"
				]
			};
		});

		it("should not error if object has all required properties", function () {
			expect(validate).not.toThrow();

			function validate () {
				Object.validate(vehicle, {
					make: "string",
					model: "string",
					year: "number"
				});
			}
		});

		it("should not error if object has extra properties", function () {
			expect(validate).not.toThrow();

			function validate () {
				vehicle.damaged = true;

				Object.validate(vehicle, {
					make: "string",
					model: "string",
					year: "number"
				});
			}
		});

		it("should accept property description as object {type, required}", function () {
			expect(validate).not.toThrow();

			function validate () {
				Object.validate(vehicle, {
					make: {
						type: "string",
						required: true
					},
					options: {
						type: "array",
						required: false
					}
				});
			}
		});

		it("should set required to false", function () {
			expect(validate).not.toThrow();

			function validate () {
				Object.validate(vehicle, {
					owner: {
						type: "object",
						required: false
					}
				});
			}
		});

		it("should error if object is missing required properties", function () {
			expect(missingProperties).toThrow();

			function missingProperties () {
				Object.validate(vehicle, {
					owner: {
						type: "string"
					}
				});
			}
		});

		it("should default property required to true", function () {
			expect(missingProperties).toThrow();

			function missingProperties () {
				Object.validate(vehicle, {
					owner: "object"
				});
			}
		});

		it("should default property type to any", function () {
			expect(validate).not.toThrow();

			function validate () {
				Object.validate(vehicle, {
					make: {
						required: true
					}
				});
			}
		});

		it("should error if property is wrong type", function () {
			expect(missingProperties).toThrow();

			function missingProperties () {
				Object.validate(vehicle, {
					year: "string"
				});
			}
		});

		it("should error if optional property is wrong type", function () {
			expect(missingProperties).toThrow();

			function missingProperties () {
				Object.validate(vehicle, {
					options: "object"
				});
			}
		});
	});
});