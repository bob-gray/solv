define(
	[
		"../meta",
		"./invocation",
		"./implementation-not-found"
	],
	function (meta, Invocation, ImplementationNotFound) {
		"use strict";

		meta({
			"entity": "method",
			"for": "Function",
			"name": "Abstract",
			"static": true,
			"description": "A higher-order function that returns a function to serve as an abstract implementation.",
			"arguments": [{
				"name": "functionName",
				"type": "string",
				"description": "The "
			}],
			"returns": {
				"type": "function",
				"description": "throws an ImplementationNotFound error."
			}
		});

		Function.Abstract = function (functionName) {
			return function () {
				var invocation = Invocation.instance,
					errorDetails = {
						functionName: functionName
					};
				if (invocation) {
					errorDetails.signature = invocation.signature;
					errorDetails.nonMatchingSignatures = invocation.nonMatchingImplementationSignatures;
					invocation.reset();
				}
				if (!errorDetails.signature) {
					errorDetails.signature = Function.getInvocationSignature(arguments);
				}
				throw new ImplementationNotFound(errorDetails);
			};
		};
	}
);
