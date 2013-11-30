define(
	[
		"../meta",
		"../type",
		"../function/signatures",
		"../error/invalid-property-type",
		"../class/shim",
		"./for-each"
	],
	function (meta, type, signatures, InvalidPropertyType) {
		"use strict";
		
		Object.staticShim(validate);
		
		function validate (object, properties) {
			Object.forEach(properties, testProperty, object);
		}
		
		function testProperty (property, key) {
			var value = this[key],
				expectedType,
				actualType;
			
			if (isRequired(property)) {
				expectedType = getExpectedType(property);
				actualType = type.of(value);
				
				if (isInvalid(expectedType, actualType)) {
					throw new InvalidPropertyType({
						name: key,
						expected: expectedType,
						actual: actualType
					});
				}
			}
		}
		
		function isRequired (property) {
			var required = true;
			
			if (type.is.not("undefined", property.requried)) {
				required = property.required;
			}
			
			return required;
		}
		
		function getExpectedType (property) {
			var expectedType;
			
			if (type.is("string", property)) {
				expectedType = property;
			
			} else if (type.is("string", property.type)) {
				expectedType = property.type;
			
			} else {
				expectedType = "!undefined|null";
			}
			
			return expectedType;
		}
		
		function isInvalid (expectedType, actualType) {
			var tester = signatures.compileReturnSignature(expectedType);
			
			return tester.test(actualType);
		}
		
		return validate;
	}
);