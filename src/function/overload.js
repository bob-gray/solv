define(
	[
		"../meta",
		"../type",
		"./invocation",
		"./signatures",
		"../class/singleton"
	],
	function (meta, type, Invocation) {
		"use strict";

		meta({
			"type": "module",
			"exports": "overload",
			"description": "Allows for function overloading by argument signature validation"
		});

		meta({
			"type": "class",
			"name": "Function",
			"global": true
		});

		meta({
			"name": "overload",
			"description": "A higher-order function that accepts an optional signature and a new implementation and returns a new proxy function. When called the new function will execute the original function or the new implementation depending on the arguments passed to it.",
			"arguments": [{
				"name": "signature",
				"type": "string|number",
				"description": "A comma delimited list that describes the argument types to be passed to a function. Can include ?*+|!. See function signature. Or the length of arguments"
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
			var tester = Function.compileImplementationSignature(implementationSignature);
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
