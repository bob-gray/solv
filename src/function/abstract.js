/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/shim");
	require("../class/singleton");

	var meta = require("../meta"),
		Invocation = require("../function/invocation"),
		ImplementationNotFound = require("../error/implementation-not-found"),
		signatures = require("./signatures");

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
			"type": "string"
		}],
		"returns": {
			"type": "function",
			"throws": "ImplementationNotFound",
			"description": "Should be overridden or overloaded. When called this function throws an error"
		}
	});
	
	Function.shimStatic("Abstract", Abstract);

	function Abstract (functionName) {

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
	}
});