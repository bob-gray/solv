define(
	[
		"../meta",
		"./implementation-not-found"
	],
	function (meta, ImplementationNotFound) {
		"use strict";

		meta({
			"entity": "class",
			"name": "Invocation"
		});

		function Invocation () {
			this.reset();
		}

		Invocation.prototype.reset = function () {
			this.signature = null;this.route = null;
			this.nonMatchingImplementationSignatures = [];
		};

		Invocation.prototype.needsSignature = function (route) {
			return this.route !== route || null === this.signature;
		};

		Invocation.prototype.setSignature = function (args) {
			this.signature = Function.getInvocationSignature(args);
			this.nonMatchingImplementationSignatures = [];
		};

		Invocation.prototype.testImplementation = function (compiledSignature) {
			return compiledSignature.test(this.signature);
		};

		Invocation.prototype.setRoute = function (route) {
			this.route = route;
		};

		Invocation.prototype.matchingImplementationFound = function (implementation) {
			this.matchingImplementation = implementation;
		};

		Invocation.prototype.addNonMatchingImplementation = function (implementationSignature) {
			this.nonMatchingImplementationSignatures.push(implementationSignature);
		};

		Invocation.prototype.implementationNotFound = function (functionName) {
			var error = new ImplementationNotFound(
				functionName,
				this.signature,
				this.nonMatchingImplementationSignatures
			);
			this.reset();
			throw error;
		};

		Invocation.prototype.route = function (context, args) {
			var route = this.route;
			if (route === this.matchingImplementation) {
				this.reset();
			}
			return route.apply(context, args);
		};

		return Invocation;
	}
);