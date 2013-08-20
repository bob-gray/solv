define(
	[
		"./meta",
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
			this.signature = null;
			this.router = null;
			if (this.nonmatchingImplementationSignatures.length) {
				this.nonmatchingImplementationSignatures = [];
			}
		};

		Invocation.prototype.needsSignature = function (router) {
			return this.router !== router || null === signature;
		};

		Invocation.prototype.implementationNotFound = function (functionName) {
			var error = new ImplementationNotFound(
				functionName,
				this.signature,
				this.nonmatchingImplementationSignatures
			);
			this.reset();
			throw error;
		};

		return Invocation;
	}
);