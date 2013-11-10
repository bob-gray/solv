define(
	[
		"./meta"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "module",
			"description": "For type checking values. Unfortunately typeof falls short and returns 'object' for for native JavaScript types: array, date, regex, and null"
		});

		meta({
			"entity": "function",
			"name": "of",
			"description": "I get the type of the value.",
			"arguments": [{
				"name": "value",
				"type": "any"
			}, {
				"name": "custom",
				"type": "object.function",
				"description": "An object of functions. Key names map to type names. Functions will accept the value and return a string representing a custom type.",
				"required": false
			}],
			"return": {
				"type": "string",
				"description": "One of the following types: string, number, boolean, array, object, date, regexp, function, undefined, or null. Result may be a custom type if custom is passed in"
			}
		});

		var toString = Object.prototype.toString;

		function of (value, custom) {
			var type = typeof value;
			if ("object" === type) {
				type = toString.call(value).slice(8, -1).toLowerCase();
			}
			if (custom && custom[type]) {
				type = custom[type](value);
			}
			return type;
		}

		meta({
			"entity": "function",
			"name": "is",
			"description": "I test the type of value against a specified type.",
			"arguments": [{
				"name": "type",
				"type": "string",
				"description": "One of the following types: string, number, boolean, array, object, date, regexp, function, undefined, or null."
			}, {
				"name": "value",
				"type": "any"
			}, {
				"name": "custom",
				"type": "object.function",
				"description": "An object of functions. Key names map to type names. Functions will accept the value and return a string representing a custom type.",
				"required": false
			}],
			"return": {
				"type": "boolean",
				"description": "True if value is of the specified type"
			}
		});

		function is (type, value, custom) {
			return of(value, custom) === type;
		}

		return {
			of: of,
			is: is
		};
	}
);
