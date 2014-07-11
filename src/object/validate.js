/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/shim");
	require("./for-each");

	var meta = require("../meta"),
		type = require("../type"),
		signatures = require("../function/signatures"),
		InvalidPropertyType = require("../error/invalid-property-type");

	meta({
		"name": "Object",
		"type": "class",
		"global": true
	});

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
	});

	Object.shimStatic("validate", validate);
	
	function validate (object, properties) {
		Object.forEach(properties, testProperty, object);
	}
	
	function testProperty (property, key) {
		var value = this[key],
			expectedType = getExpectedType(property),
			actualType = type.of(value);

		if (isInvalid(expectedType, actualType)) {
			throw new InvalidPropertyType({
				name: key,
				expected: expectedType,
				actual: actualType
			});
		}
	}
	
	function getExpectedType (property) {
		var expectedType;
		
		if (type.is("string", property)) {
			expectedType = property;
		
		} else if (type.is("string", property.type)) {
			expectedType = property.type;
		
		} else if (isRequired(property)) {
			expectedType = "!undefined|null";
		
		} else {
			expectedType = "any";
		}
		
		return expectedType;
	}
	
	function isInvalid (expectedType, actualType) {
		var tester = signatures.compileReturnSignature(expectedType);
		
		return tester.test(actualType);
	}
	
	function isRequired (property) {
		var required = true;
		
		if (type.is.not("undefined", property.requried)) {
			required = property.required;
		}
		
		return required;
	}
	
	return validate;
});