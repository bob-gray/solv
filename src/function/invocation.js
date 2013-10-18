define(
	[
		"../meta",
		"../type"
	],
	function (meta, type) {
		"use strict";

		meta({
			"name": "Invocation",
			"type": "class"
		});

		meta({
			"name": "reset",
			"arguments": []
		});

		meta({
			"name": "isStart",
			"arguments": [{
				"name": "next",
				"type": "function"
			}],
			"returns": "boolean"
		});

		meta({
			"name": "setSignatureAndLength",
			"arguments": [{
				"name": "args",
				"type": "arguments"
			}]
		});

		meta({
			"name": "testImplementation",
			"arguments": [{
				"name": "tester",
				"type": "number|regex"
			}],
			"returns": "boolean"
		});

		meta({
			"name": "matchingImplementationFound",
			"arguments": [{
				"name": "implementation",
				"type": "function"
			}]
		});

		meta({
			"name": "setNext",
			"arguments": [{
				"name": "next",
				"type": "function"
			}]
		});

		meta({
			"name": "addNonMatchingSignature",
			"arguments": [{
				"name": "implementationSignature",
				"type": "string"
			}]
		});

		meta({
			"name": "proceed",
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
			this.signature = Function.getInvocationSignature(args);
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

		Invocation.prototype.setNext = function (next) {
			this.next = next;
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