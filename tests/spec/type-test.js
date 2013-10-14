define(["src/type"], function (type) {
	"use strict";

	var subjects = {
		"array": [],
		"boolean": true,
		"date": new Date(),
		"function": function () {},
		"object": {},
		"string": "",
		"regexp": /re/,
		"null": null,
		"number": 1,
		"undefined": undefined
	};

	describe("type.of(value)", function () {
		forEach(subjects, testOfFunction);
	});

	forEach(subjects, testIsFunction);

	function testOfFunction (name, value) {
		it("gets the type of "+ name, function () {
			expect(type.of(value)).toEqual(name);
		});
	}

	function testIsFunction (isName) {
		describe("type.is('"+ isName +"', value)", function () {
			forEach(subjects, curry(testIs, isName));
		});
	}

	describe("type.custom(subtypes)", function () {
		it("accepts an object of subtypes for further processing given native types", function () {
			var tester = type.custom({
				string: function (value) {
					var type = "string";
					if (/\d{3}-\d{3}-\d{4}/.test(value)) {
						type += ".phone";
					}
					return type;
				}
			});
			expect(tester.is("number", 0)).toBe(true);
			expect(tester.of(true)).toBe("boolean");
			expect(tester.is("object", [])).toBe(false);
			expect(tester.of("")).toBe("string");
			expect(tester.is("string.phone", "515-555-3333")).toBe(true);
			expect(tester.of("515-555")).toBe("string");
		});
	});

	function testIs (isName, valueName, value) {
		var result = valueName === isName,
			specTitle = getSpecTitle(valueName, isName, result);

		it(specTitle, function () {
			expect(type.is(isName, value)).toEqual(result);
		});
	}

	function getSpecTitle (valueName, isName, result) {
		var resultText;
		if (result) {
			resultText = " is ";
		} else {
			resultText = " is not ";
		}
		return valueName + resultText + isName;
	}

	function forEach (object, callback) {
		for (var name in subjects) {
			if (subjects.hasOwnProperty(name)) {
				var value = object[name];
				callback(name, value);
			}
		}
	}

	function curry (fn) {
		var args = argsToArray(arguments).slice(1);
		return function () {
			var moreArgs = argsToArray(arguments);
			return fn.apply(this, args.concat(moreArgs));
		};
	}

	function argsToArray (args) {
		return Array.prototype.slice.call(args, 0);
	}
});