define(
	[
		"../meta",
		"./invocation",
		"../error/implementation-not-found",
		"./signatures",
		"../class/singleton"
	],
	function (meta, Invocation, ImplementationNotFound, signatures) {
		"use strict";

		meta({
			"name": "Function",
			"type": "class",
			"global": true
		});

		meta({
			"name": "Abstract",
			"static": true,
			"description": "Higher-order function that returns a function to serve as an abstract implementation",
			"arguments": [{
				"name": "functionName",
				"type": "string",
				"description": "The name of the function which should overload or override the return abstract function."
			}],
			"returns": {
				"type": "function",
				"throws": "ImplementationNotFound"
			}
		});

		if (!Function.Abstract) {
			Function.Abstract = function (functionName) {
				return function () {
					var invocation = Invocation.singleton(),
						errorDetails = {
							functionName: functionName
						};
					if (invocation) {
						errorDetails.signature = invocation.signature;
						errorDetails.nonMatchingSignatures = invocation.nonMatchingSignatures;
						invocation.reset();
					}
					if (!errorDetails.signature) {
						errorDetails.signature = signatures.getInvocationSignature(arguments);
					}
					throw new ImplementationNotFound(errorDetails);
				};
			};
		}
	}
);
