define(
	[
		"../meta",
		"../type",
		"./signatures"
	],
	function (meta, type, signatures) {
		"use strict";

		meta({
			"name": "Invocation",
			"type": "class",
			"singleton": true,
			"description": "Utilized by function.overload to aid in routing an invocation to the proper implementation",
			"properties": {
				"nonMatchingSignatures": {
					"type": "array",
					"description": "Fills with signatures of implementations that were not a match for the current invocation"
				}
			}
		});

		meta({
			"name": "reset",
			"description": "Resets invocation to initial state",
			"arguments": []
		});

		meta({
			"name": "isStart",
			"description": "Tests if this is the start of a new invocation or if a invocation is already in progress",
			"arguments": [{
				"name": "router",
				"type": "function"
			}],
			"returns": {
				"type": "boolean",
				"description": "True if router is not the next implementation router"
			}
		});

		meta({
			"name": "setSignatureAndLength",
			"description": "Sets the invocation signature and length from arguments",
			"arguments": [{
				"name": "args",
				"type": "arguments",
				"description": "passed into overloaded function"
			}]
		});

		meta({
			"name": "testImplementation",
			"description": "Tests if invocation matches implementation",
			"arguments": [{
				"name": "tester",
				"type": "regex|number",
				"description": "A compiled implementation signature or implementation arguments length"
			}],
			"returns": {
				"type": "boolean",
				"description": "True if tester matches invocation signature or length"
			}
		});

		meta({
			"name": "matchingImplementationFound",
			"description": "Sets up invocation to invoke matching implementation and reset itself on the next call to invocation.proceed",
			"arguments": [{
				"name": "implementation",
				"type": "function"
			}]
		});

		meta({
			"name": "addNonMatchingSignature",
			"description": "Add an implementationSignature to invocation.nonMatchingSignatures",
			"arguments": [{
				"name": "implementationSignature",
				"type": "string"
			}]
		});

		meta({
			"name": "setNext",
			"description": "Sets next to be invoked on the next call to invocation.proceed",
			"arguments": [{
				"name": "next",
				"type": "function"
			}]
		});

		meta({
			"name": "proceed",
			"description": "Invoke invocation.next",
			"arguments": [{
				"name": "context",
				"type": "arguments"
			}, {
				"name": "args",
				"type": "arguments"
			}]
		});

		function Invocation () {
			this.reset();
		}

		Invocation.prototype.reset = function () {
			this.next = null;
			this.signature = null;
			this.length = null;
			this.matchingImplementation = null;
			this.nonMatchingSignatures = [];
		};

		Invocation.prototype.isStart = function (next) {
			return next !== this.next;
		};

		Invocation.prototype.setSignatureAndLength = function (args) {
			this.signature = signatures.getInvocationSignature(args);
			this.length = args.length;
		};

		Invocation.prototype.testImplementation = function (tester) {
			var match;
			if (type.is("number", tester)) {
				match = tester === this.length;
			} else {
				match = tester.test(this.signature);
			}
			return match;
		};

		Invocation.prototype.matchingImplementationFound = function (implementation) {
			this.matchingImplementation = implementation;
			this.setNext(implementation);
		};

		Invocation.prototype.setNext = function (router) {
			this.next = router;
		};

		Invocation.prototype.addNonMatchingSignature = function (implementationSignature) {
			this.nonMatchingSignatures.push(implementationSignature);
		};

		Invocation.prototype.proceed = function (context, args) {
			var next = this.next;
			if (next === this.matchingImplementation) {
				this.reset();
			}
			return next.apply(context, args);
		};

		return Invocation;
	}
);