define(
	[
		"solv/meta",
		"solv/type",
		"solv/error/invalid-return-type",
		"solv/function/signatures",
		"solv/function/overload"
	],
	function (meta, type, InvalidReturnType, signatures) {
		"use strict";

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
			"type": "method",
			"name": "validateReturnType",
			"description": "Higher-order function that returns a proxy function that returns an error when the original function's return value's type doesn't match the signature",
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
			"type": "method",
			"name": "validateReturnType",
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

		if (!Function.prototype.validateReturnType) {
			Function.prototype.validateReturnType = validateWithSignature.overload("object", validateWithOptions);
		}

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
						actualReturnType: returnType,
						expectedReturnType: options.signature
					});
				}
			}

			return proxy;
		}
	}
);