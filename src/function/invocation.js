/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var type = require("../type"),
		signatures = require("./signatures");

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
});