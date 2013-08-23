define(
	[
		"../meta",
		"../type",
		"./invocation",
		"./signatures",
		"../shim/array"
	],
	function (meta, type, Invocation) {
		"use strict";

		meta({
			"entity": "module",
			"export": "Function",
			"description": "Allows for function overloading and argument validation"
		});

		var Abstract = meta({
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
			"return": {
				"type": "function",
				"description": "First looks for a default implementation and invokes it if found. If default implementation is not found throws an ImplementationNotFound error."
			}
		});

		var overload = meta({
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
			"return": {
				"type": "function",
				"description": "New router proxy function"
			}
		});

		var invocation = new Invocation();

		Function.Abstract = function (functionName) {
			return function () {
				var defaultImplementation = this["@default: "+ functionName];

				if (type.is("function", defaultImplementation)) {
					return defaultImplementation.apply(this, arguments);
				}

				if (!invocation.signature) {
					invocation.signature = Function.getArgumentsSignature(arguments);
				}

				invocation.implementationNotFound(functionName);
			};
		};

		Function.prototype.overload = function (implementationSignature, implementation) {
			var fn = this,
				compiledSignature,
				router;

			if (1 === arguments.length) {
				implementation = implementationSignature;
				implementationSignature = null;
			}

			if (!implementationSignature) {
				implementationSignature = list("*", implementation.length);
				router = routeByLength;
			} else {
				compiledSignature = Function.compileImplementationSignature(implementationSignature);
				router = routeBySignature;
			}

			function routeByLength () {
				if (arguments.length === implementation.length) {
					implementationIsMatch();
				} else {
					implementationIsNotMatch();
				}
				return route.apply(this, arguments);
			}

			function routeBySignature () {
				if (invocation.needsSignature(router)) {
					invocation.signature = Function.getInvocationSignature(arguments);
				}
				if (compiledSignature.test(invocation.signature)) {
					implementationIsMatch();
				} else {
					implementationIsNotMatch();
				}
				return route.apply(this, arguments);
			}

			function implementationIsMatch () {
				invocation.router = implementation;
			}

			function implementationIsNotMatch () {
				invocation.router = fn;
				invocation.nonmatchingImplementationSignatures.push(implementationSignature);
			}

			function route () {
				var result = invocation.router.apply(this, arguments);
				invocation.reset();
				return result;
			}

			return router;
		};

		function list (text, times) {
			return new Array(times + 1).join(text).split("").join(",");
		}
	}
);
