define(
	[
		"./meta"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "module",
			"description": "Native typeof operator returns 'object' for for JavaScript types: array, date, regexp, arguments and null. Native type names for use with type.of and type.is include: string, number, boolean, array, object, date, regexp, function, undefined, arguments or null."
		});

		meta({
			"entity": "function",
			"name": "of",
			"description": "I get the native type name of a value.",
			"arguments": [{
				"name": "value",
				"type": "any"
			}],
			"returns": "string"
		});

		meta({
			"entity": "function",
			"name": "is",
			"description": "I test the native type name of a value against a specified type name.",
			"arguments": [{
				"name": "type",
				"type": "string"
			}, {
				"name": "value",
				"type": "any"
			}],
			"returns": "boolean"
		});

		meta({
			"entity": "function",
			"name": "custom",
			"description": "For creating a custom type tester that extends stock tester.",
			"arguments": [{
				"name": "subtypes",
				"type": "object",
				"description": "Object's keys map to native type names. Object's values must be functions that implement the type.of signature. Newly created tester's methods delegate to subtypes functions where provided. A function for each native types is not required. Implement only the required subtypes."
			}],
			"returns": {
				"type": "object",
				"description": "Custom type tester containing 'of' and 'is' methods."
			}
		});

		function of (value) {
			var type = typeof value;
			if (null === value) {
				type = "null";
			} else if ("object" === type) {
				type = getObjectType(value);
			}
			return type;
		}

		var toString = Object.prototype.toString;

		function getObjectType (value) {
			var objectString = toString.call(value);
			return objectString.slice(8, -1).toLowerCase();
		}

		function is (type, value) {
			return of(value) === type;
		}

		function custom (subtypes) {
			function _of (value) {
				var type = of(value);
				if (hasSubtypes(type)) {
					type = getSubtype(type, value);
				}
				return type;
			}

			function _is (type, value) {
				return _of(value) === type;
			}

			function hasSubtypes (type) {
				return type in subtypes;
			}

			function getSubtype (type, value) {
				return subtypes[type](value);
			}

			return {
				of: _of,
				is: _is
			};
		}

		return {
			of: of,
			is: is,
			custom: custom
		};
	}
);
