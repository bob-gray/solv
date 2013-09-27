define(
	[
		"../meta"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "class",
			"name": "Invocation",
			"properties": [{
				"name": "instance",
				"type": "object",
				"static": true
			}, {
				"name": "signature",
				"type": "string",
				"default": null
			}, {
				"name": "nonMatchingSignatures",
				"type": "array"
			}]
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
			"name": "setSignature",
			"arguments": [{
				"name": "args",
				"type": "arguments"
			}]
		});

		meta({
			"name": "testImplementation",
			"arguments": [{
				"name": "compiledSignature",
				"type": "regex"
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
			Invocation.instance = this;
		}

		Invocation.prototype.reset = function () {
			this.next = null;
			this.signature = null;
			this.matchingImplementation = null;
			this.nonMatchingSignatures = [];
		};

		Invocation.prototype.isStart = function (next) {
			return next !== this.next;
		};

		Invocation.prototype.setSignature = function (args) {
			this.signature = Function.getInvocationSignature(args);
		};

		Invocation.prototype.testImplementation = function (compiledSignature) {
			return compiledSignature.test(this.signature);
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