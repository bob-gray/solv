define(
	[
		"../meta",
		"../type",
		"./signatures"
	],
	function (meta, type) {
		"use strict";

		meta({
			"entity": "module",
			"description": "Allows for the return type of a function to be validated."
		});

		meta({
			"entity": "method",
			"for": "Function",
			"name": "validateReturnType",
			"description": "A higher-order function that accepts an expected return type and optional fail callback.",
			"arguments": [{
				"name": "returnSignature",
				"type": "string",
				"description": "A pipe delimited list of possible return types. Can include '!'. See function signature.",
				"required": false
			}, {
				"name": "typeInvalid",
				"type": "function",
				"description": "Callback executed when the type of the function return value doesn't match returnSignature."
			}],
			"return": {
				"type": "function",
				"description": "Proxy function to be executed in place of original function."
			}
		});

		Function.prototype.validateReturnType = function (returnSignature, typeInvalid) {
			var compiledReturnSignature = Function.compileReturnSignature(returnSignature),
				fn = this;

			return function proxy () {
				var result = fn.apply(this, arguments),
					returnType = type.of(result);

				if (compiledReturnSignature.test(returnType)) {
					return result;

				} else if (typeInvalid) {
					return typeInvalid({
						expected: returnSignature,
						actual: returnType
					});

				} else {
					throw "Function return type was expected to be "+ returnSignature +"; actual return type was "+ returnType;
				}
			};
		};
	}
);