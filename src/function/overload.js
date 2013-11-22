define(
	[
		"solv/meta",
		"solv/type",
		"solv/function/invocation",
		"solv/function/signatures",
		"solv/class/singleton"
	],
	function (meta, type, Invocation, signatures) {
		"use strict";

		meta({
			"type": "module",
			"exports": "overload",
			"description": "Allows for function overloading by length and type of arguments"
		});

		meta({
			"name": "Function",
			"type": "class",
			"global": true
		});

		meta({
			"name": "overload",
			"description": "Higher-order function that accepts a signature and an implementation and returns a new proxy function. When called the proxy function will execute the original function or the new implementation depending on the arguments passed to it.",
			"arguments": [{
				"name": "signature",
				"type": "string",
				"description": "An implemenation signature string"
			}, {
				"name": "implementation",
				"type": "function"
			}],
			"returns": "function"
		});

		meta({
			"name": "overload",
			"arguments": [{
				"name": "length",
				"type": "number",
				"description": "An implemenation arguments length"
			}, {
				"name": "implementation",
				"type": "function"
			}],
			"returns": "function"
		});

		meta({
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

		var invocation = Invocation.singleton(),
			overload;

		addOverloadByLengthImplementation();
		addOverloadBySignatureImplementation();

		function overloadByLength (thisImplementation) {
			var implementationSignature = list("any", thisImplementation.length);
			return createRouter({
				signature: implementationSignature,
				tester: thisImplementation.length,
				current: thisImplementation,
				next: this
			});
		}

		function overloadByLengthSignature (length, thisImplementation) {
			var implementationSignature = list("any", thisImplementation.length);
			return createRouter({
				signature: implementationSignature,
				tester: length,
				current: thisImplementation,
				next: this
			});
		}

		function overloadBySignature (implementationSignature, thisImplementation) {
			var tester = signatures.compileImplementationSignature(implementationSignature);
			return createRouter({
				signature: implementationSignature,
				tester: tester,
				current: thisImplementation,
				next: this
			});
		}

		function createRouter (implementation) {
			return function router () {
				if (invocation.isStart(router)) {
					invocation.reset();
					invocation.setSignatureAndLength(arguments);
				}
				if (invocation.testImplementation(implementation.tester)) {
					invocation.matchingImplementationFound(implementation.current);
				} else {
					invocation.addNonMatchingSignature(implementation.signature);
					invocation.setNext(implementation.next);
				}
				return invocation.proceed(this, arguments);
			};
		}

		function addOverloadByLengthImplementation () {
			overload = overloadByLength.call(overloadByLength, overloadByLengthSignature);
		}

		function addOverloadBySignatureImplementation () {
			overload = overloadBySignature.call(overload, "string,function", overloadBySignature);
		}

		function list (text, times) {
			return new Array(times + 1).join(","+ text).slice(1);
		}

		if (!Function.prototype.overload) {
			Function.prototype.overload = overload;
		}

		return overload;
	}
);
