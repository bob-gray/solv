if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("./overload");
	require("../class/shim");

	var meta = require("../meta"),
		type = require("../type"),
		InvalidReturnType = require("../error/invalid-return-type"),
		signatures = require("./signatures");

	meta({
		"type": "module",
		"description": "Allows for the return type of a function to be validated"
	});

	meta({
		"name": "Function",
		"type": "class",
		"global": true
	});

	meta({
		"name": "validateReturnType",
		"shim": true,
		"description": "Higher-order function that returns a proxy function that throws an error when the original function's return value's type doesn't match the signature",
		"arguments": [{
			"name": "signature",
			"type": "string"
		}],
		"returns": {
			"type": "function",
			"throws": "InvalidReturnType"
		}
	});

	meta({
		"name": "validateReturnType",
		"shim": true,
		"arguments": [{
			"name": "options",
			"type": "object"
		}],
		"returns": {
			"type": "function",
			"throws": "InvalidReturnType"
		}
	});

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
	});

	var validate = validateWithSignature.overload("object", validateWithOptions);

	Function.shim("validateReturnType", validate);

	function validateWithSignature (signature) {
		return validateWithOptions.call(this, {
			signature: signature
		});
	}

	function validateWithOptions (options) {
		var compiledReturnSignature = signatures.compileReturnSignature(options.signature),
			fn = this;

		if ("any" === options.signature) {
			proxy = fn;
		}

		if (!options.functionName) {
			options.functionName = "";
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

		return proxy;
	}
});