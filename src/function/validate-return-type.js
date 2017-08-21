/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"name": "Function",
		"type": "class",
		"global": true
	})

	meta({
		"name": "validateReturnType",
		"description": "Creates function proxy that throws an error when the original function's return value's type doesn't match the signature",
		"arguments": [{
			"name": "signature",
			"type": "string"
		}],
		"returns": {
			"type": "function",
			"throws": "InvalidReturnType"
		}
	})

	meta({
		"name": "validateReturnType",
		"arguments": [{
			"name": "options",
			"type": "object"
		}],
		"returns": {
			"type": "function",
			"throws": "InvalidReturnType"
		}
	})

	meta({
		"name": "options",
		"type": "object",
		"properties": {
			"functionName": {
				"type": "string",
				"required": false
			},
			"signature": {
				"type": "string",
				"description": "A pipe delimited list of possible return types optionally preceeding by an exclamation point making the signature negating"
			}
		}
	})*/

	require("./overload");

	var type = require("../type"),
		InvalidReturnType = require("../error/invalid-return-type"),
		signatures = require("./signatures"),
		validate = validateWithSignature.overload("object", validateWithOptions);

	Function.prototype.validateReturnType = validate;

	function validateWithSignature (signature) {
		return validateWithOptions.call(this, {
			signature: signature
		});
	}

	function validateWithOptions (options) {
		var compiledReturnSignature = signatures.compileReturnSignature(options.signature),
			fn = this,
			result = proxy;

		if (!options.functionName) {
			options.functionName = "";
		}

		if ("any" === options.signature) {
			result = fn;
		}

		function proxy () {
			var result = fn.apply(this, arguments),
				returnType = type.of(result);

			if (compiledReturnSignature.test(returnType)) {
				return result;

			} else {
				throw new InvalidReturnType({
					functionName: options.functionName,
					expected: options.signature,
					actual: returnType
				});
			}
		}

		return result;
	}
});