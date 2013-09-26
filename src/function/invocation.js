define(
	[
		"../meta"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "class",
			"name": "Invocation"
		});

		function Invocation () {
			this.reset();
			Invocation.instance = this;
		}

		Invocation.prototype.reset = function () {
			this.signature = null;this.route = null;
			this.nonMatchingImplementationSignatures = [];
		};

		Invocation.prototype.isNewRoute = function (route) {
			return this.route !== route;
		};

		Invocation.prototype.setSignature = function (args) {
			this.signature = Function.getInvocationSignature(args);
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

		Invocation.prototype.proceed = function (context, args) {
			var route = this.route;
			if (route === this.matchingImplementation) {
				this.reset();
			}
			return route.apply(context, args);
		};

		return Invocation;
	}
);