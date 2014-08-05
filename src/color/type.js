/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"type": "module",
		"description": "Custom type tester for rgb and hsb color objects"
	})*/

	var colorType,
		type = require("../type"),
		rgb = sortList("rgb"),
		hsb = sortList("hsb"),
		hexRegEx = /^#?(?:[0-9a-f]{3}){1,2}$/i,
		HEX_RADIX = 16,
		maxColorDecimal = parseInt("ffffff", HEX_RADIX);

	colorType = type.custom({
		string: tester(function (color) {
			if (hexRegEx.test(color)) {
				return "hex";
			}
		}),

		number: tester(function (color) {
			if (color > 0 && color < maxColorDecimal) {
				return "decimal";
			}
		}),

		object: tester(function (color) {
			var keys = getSortedKeys(color),
				type;

			if (keys === rgb) {
				type = "rgb";

			} else if (keys === hsb) {
				type = "hsb";
			}

			return type;
		})
	});

	function tester (fn) {
		return function (color) {
			return fn(color) || "unknown";
		};
	}

	function getSortedKeys (object) {
		return Object.keys(object).sort().join("");
	}

	function sortList (list) {
		return list.split("").sort().join("");
	}

	return colorType;
});