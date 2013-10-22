define(
	[
		"./meta"
	],
	function (meta) {
		"use strict";

		meta({
			"type": "module",
			"description": "Native typeof operator fails and returns 'object' for JavaScript types: array, date, regexp and null. Native type names for use with this module include: string, number, boolean, array, object, date, regexp, function, undefined and null."
		});

		meta({
			"name": "of",
			"type": "function",
			"description": "Gets the native type name of a value.",
			"arguments": [{
				"name": "value",
				"type": "any"
			}],
			"returns": "string"
		});

		meta({
			"name": "is",
			"type": "function",
			"description": "Tests the native type name of a value against a specified type name.",
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
			"name": "is.not",
			"type": "function",
			"description": "Tests the native type name of a value not to be a specified type name.",
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
			"name": "custom",
			"type": "function",
			"description": "For creating a custom type tester that extends stock tester.",
			"arguments": [{
				"name": "subtypes",
				"type": "object",
				"description": "Object's keys map to native type names. Object's values must be functions that implement the type.of signature. Newly created tester's methods delegate to subtypes functions where provided. A function for each native types is not required. Implement only the required subtypes."
			}],
			"returns": {
				"type": "object",
				"description": "Custom type tester containing .of, .is and .is.not methods."
			}
		});

		var toString = Object.prototype.toString;

		function of (value) {
			var type = typeof value;
			if (null === value) {
				type = "null";
			} else if ("object" === type) {
				type = getObjectType(value);
			}
			return type;
		}


		function getObjectType (value) {
			var objectString = toString.call(value);
			return objectString.slice(8, -1).toLowerCase();
		}

		function is (type, value) {
			return of(value) === type;
		}

		is.not = function (type, value) {
			return of(value) !== type;
		};

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

			_is.not = function (type, value) {
				return _of(value) !== type;
			};

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
