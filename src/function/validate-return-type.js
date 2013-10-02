define(
	[
		"../meta",
		"../type",
		"./invalid-return-type",
		"./overload",
		"./signatures"
	],
	function (meta, type, InvalidReturnType) {
		"use strict";

		meta({
			"entity": "module",
			"description": "Allows for the return type of a function to be validated."
		});

		meta({
			"entity": "class",
			"name": "Function",
			"global": true
		});

		meta({
			"entity": "method",
			"name": "validateReturnType",
			"description": "A higher-order function that accepts an expected return type and optional fail callback.",
			"arguments": [{
				"name": "signature",
				"type": "string"
			}],
			"returns": {
				"type": "function",
				"description": "Proxy function to be executed in place of original function."
			}
		});

		meta({
			"entity": "method",
			"name": "validateReturnType",
			"description": "A higher-order function that accepts an expected return type and optional fail callback.",
			"arguments": [{
				"name": "options",
				"type": "object"
			}],
			"returns": {
				"type": "function",
				"description": "Proxy function to be executed in place of original function."
			}
		});

		meta({
			"entity": "object",
			"name": "options",
			"properties": [{
				"name": "functionName",
				"type": "string"
			}, {
				"name": "signature",
				"type": "string",
				"description": "A pipe delimited list of possible return types. Can include '!'. See function signature."
			}]
		});

		Function.prototype.validateReturnType = validateWithSignature.overload("object", validateWithOptions);

		function validateWithSignature (signature) {
			return validateWithOptions.call(this, {
				signature: signature
			});
		}

		function validateWithOptions (options) {
			var compiledReturnSignature = Function.compileReturnSignature(options.signature),
				func = this;
			if (!options.functionName) {
				options.functionName = "";
			}

			function proxy () {
				var result = func.apply(this, arguments),
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