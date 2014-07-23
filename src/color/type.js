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
		string: function (color) {
			var type = "unknown";

			if (hexRegEx.test(color)) {
				type = "hex";
			}

			return type;
		},

		number: function (color) {
			var type = "unknown";

			if (color > 0 && color < maxColorDecimal) {
				type = "decimal";
			}

			return type;
		},

		object: function (color) {
			var keys = getSortedKeys(color),
				type = "unknown";

			if (keys === rgb) {
				type = "rgb";

			} else if (keys === hsb) {
				type = "hsb";
			}

			return type;
		}
	});

	function getSortedKeys (object) {
		return Object.keys(object).sort().join("");
	}

	function sortList (list) {
		return list.split("").sort().join("");
	}

	return colorType;
});