define(["src/type"], function (type) {
	"use strict";

	var subjects = {
		"arguments": arguments,
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
		}
	}

	function argsToArray (args) {
		return Array.prototype.slice.call(args, 0);
	}
});