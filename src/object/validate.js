/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/method");
	require("./for-each");

	var meta = require("../meta"),
		type = require("../type"),
		signatures = require("../function/signatures"),
		InvalidPropertyType = require("../error/invalid-property-type");

	/*meta({
		"name": "Object",
		"type": "class",
		"global": true
	})*/

	Object.method(
		meta({
			"name": "validate",
			"static": true,
			"shim": true,
			"throws": "InvalidPropertyType",
			"description": "Tests an object against meta data to ensure all required properties are present and all properties are of the correct type",
			"arguments": [{
				"name": "object",
				"type": "object"
			}, {
				"name": "properties",
				"type": "object",
				"description": "Key names should match object. Members can be a string representing the type(s) or an objects with properties 'type' and 'required'. Both are optional. Default is {type:'any', required:true}"
			}]
		}),
		validate
	);

	function validate (object, properties) {
		Object.forEach(properties, testProperty, object);
	}

	function testProperty (property, key) {
		var value = this[key],
			signature = getSignature(property),
			actualType = type.of(value);

		if (isInvalid(signature, actualType)) {
			throw new InvalidPropertyType({
				name: key,
				expected: signature,
				actual: actualType
			});
		}
	}

	function getSignature (property) {
		var signature = getExpectedType(property),
			required = isRequired(property);

		if (!required && !signature) {
			signature = "any";
		} else if (!required) {
			signature += "|undefined";
		} else if (!signature) {
			signature = "!undefined";
		}

		return signature;
	}

	function getExpectedType (property) {
		var expectedType;

		if (type.is("string", property)) {
			expectedType = property;
		} else if (type.is("string", property.type)) {
			expectedType = property.type;
		}

		return expectedType;
	}

	function isInvalid (signature, actualType) {
		var tester = signatures.compileReturnSignature(signature);

		return tester.test(actualType) === false;
	}

	function isRequired (property) {
		var required;

		if (type.is("boolean", property.required)) {
			required = property.required;
		} else {
			required = true;
		}

		return required;
	}
});