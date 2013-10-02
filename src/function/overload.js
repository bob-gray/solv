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
			"entity": "class",
			"name": "Function",
			"global": true
		});

		meta({
			"entity": "method",
			"name": "overload",
			"description": "A higher-order function that accepts an optional signature and a new implementation and returns a new proxy function. When call the new function will execute the original function or the new implementation depending on the arguments passed to it.",
			"arguments": [{
				"name": "signature",
				"type": "string",
				"description": "A comma delimited list that describes the argument types to be passed to a function. Can include ?*+|!. See function signature.",
			}, {
				"name": "implementation",
				"type": "function"
			}],
			"returns": {
				"type": "function",
				"description": "New proxy function"
			}
		});

		meta({
			"entity": "method",
			"name": "overload",
			"description": "For overloading by argument length only.",
			"arguments": [{
				"name": "implementation",
				"type": "function"
			}],
			"returns": {
				"type": "function",
				"description": "New proxy function"
			}
		});

		var invocation = new Invocation();

		if (!Function.prototype.overload) {
			Function.prototype.overload = overloadByLength.call(overloadByLength, overloadBySignature);
		}

		function overloadByLength (thisImplementation) {
			var nextImplementation = this,
				implementationSignature = list("any", thisImplementation.length);

			return function byLength () {
				if (invocation.isStart(byLength)) {
					invocation.reset();
					invocation.setSignature(arguments);
				}
				if (arguments.length === thisImplementation.length) {
					invocation.matchingImplementationFound(thisImplementation);
				} else {
					invocation.addNonMatchingSignature(implementationSignature);
					invocation.setNext(nextImplementation);
				}
				return invocation.proceed(this, arguments);
			};
		}

		function overloadBySignature (implementationSignature, thisImplementation) {
			var nextImplementation = this,
				compiledImplementationSignature = Function.compileImplementationSignature(implementationSignature);

			return function bySignature () {
				if (invocation.isStart(bySignature)) {
					invocation.reset();
					invocation.setSignature(arguments);
				}
				if (invocation.testImplementation(compiledImplementationSignature)) {
					invocation.matchingImplementationFound(thisImplementation);
				} else {
					invocation.addNonMatchingSignature(implementationSignature);
					invocation.setNext(nextImplementation);
				}
				return invocation.proceed(this, arguments);
			};
		}

		function list (text, times) {
			return new Array(times + 1).join(text).split("").join(",");
		}
	}
);
