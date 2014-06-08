/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/shim");
	require("../class/singleton");

	var meta = require("../meta"),
		type = require("../type"),
		Invocation = require("./invocation"),
		signatures = require("./signatures");

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
		"returns": "function"
	});

	meta({
		"name": "Function Implementation Signature",
		"type": "specification",
		"Purpose": "Defining the expected calling signature of a function",
		"Overview":	"Implementation signatures are special comma delimited lists of signature components that describe the argument types expected by a function. Components are composed of one or more pipe delimited types. Signatures can be optionally prefixed with an exclamation point. Components may be suffixed with a meta character indicating quantity. White space is ignored. The number of components won't necessarily equal the number of a matching arguments because arguments can be specified as optional and/or repeating.",
		"Types": "string, number, boolean, array, object, date, regexp, function, undefined, null or any",
		"Meta Characters": {
			"!": "Creates a negating signature. !string can be read 'not string'",
			"|": "Or operator. number|boolean can be read 'number or boolean'",
			"?": "Zero or one of the preceding component. Makes a component optional",
			"+": "One or more of the preceding component. Makes a component repeating",
			"*": "Zero or more of the preceding component. Make a component optional and repeating"
		},
		"Examples": {
			"boolean?, string|number, function": "Matches (boolean, number, function) and (boolean, string, function) and (string, function) and (number, function). It does not match (boolean, function) or (boolean, number).",
			"string, object, any, !null|undefined*": "Matches (string, object, object) and (string, object, number, number) and (string, object, null). It does not match (string, object, object, null)."
		}
	});

	var invocation = Invocation.singleton(),
		overload;

	addOverloadByLengthImplementation();
	addOverloadBySignatureImplementation();

	Function.shim("overload", overload);

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
		var implementationSignature = list("any", length);

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

	return overload;
});