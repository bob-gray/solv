define(
	[
		"../meta",
		"../type",
		"./invocation",
		"./signatures"
	],
	function (meta, type, Invocation) {
		"use strict";

		meta({
			"entity": "module",
			"description": "Allows for function overloading by argument signature validation"
		});

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
				"description": "First looks for a default implementation and invokes it if found. If default implementation is not found throws an ImplementationNotFound error."
			}
		});

		meta({
			"entity": "method",
			"for": "Function",
			"name": "overload",
			"description": "A higher-order function that accepts an optional signature and a new implementation and returns a new router that acts as a proxy. The returned router function capable of executing the original function or the new implementation depending on the arguments passed to it.",
			"arguments": [{
				"name": "signature",
				"type": "string",
				"description": "A comma delimited list that describes the argument types to be passed to a function. Can include ?*+|!. See function signature.",
				"required": false
			}, {
				"name": "implementation",
				"type": "function"
			}],
			"returns": {
				"type": "function",
				"description": "New router proxy function"
			}
		});

		var invocation = new Invocation();

		Function.Abstract = function (functionName) {
			return function () {
				var defaultImplementation = this["__default__: "+ functionName];
				if (type.is("function", defaultImplementation)) {
					return defaultImplementation.apply(this, arguments);
				}
				if (!invocation.signature) {
					invocation.signature = Function.getInvocationSignature(arguments);
				}
				invocation.implementationNotFound(functionName);
			};
		};

		Function.prototype.overload = function (implementationSignature, thisImplementation) {
			var nextImplementation = this,
				compiledImplementationSignature,
				overloaded;

			if (1 === arguments.length) {
				thisImplementation = implementationSignature;
				implementationSignature = list("any", thisImplementation.length);
				overloaded = overloadByLength;
			} else {
				compiledImplementationSignature = Function.compileImplementationSignature(implementationSignature);
				overloaded = overloadBySignature;
			}

			function overloadByLength () {
				if (arguments.length === thisImplementation.length) {
					invocation.matchingImplementationFound(thisImplementation);
					invocation.setRoute(thisImplementation);
				} else {
					invocation.addNonMatchingImplementation(implementationSignature);
					invocation.setRoute(nextImplementation);
				}
				return invocation.proceed(this, arguments);
			}

			function overloadBySignature () {
				if (invocation.needsSignature(overloaded)) {
					invocation.setSignature(arguments);
				}
				if (invocation.testImplementation(compiledImplementationSignature)) {
					invocation.matchingImplementationFound(thisImplementation);
					invocation.setRoute(thisImplementation);
				} else {
					invocation.addNonMatchingImplementation(implementationSignature);
					invocation.setRoute(nextImplementation);
				}
				return invocation.proceed(this, arguments);
			}

			return overloaded;
		};

		function list (text, times) {
			return new Array(times + 1).join(text).split("").join(",");
		}
	}
);
