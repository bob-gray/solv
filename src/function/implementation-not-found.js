define(
	[
		"../meta"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "class",
			"name": "ImplementationNotFound",
			"extends": "Error",
			"arguments": [{
				"name": "errorDetails",
				"type": "object"
			}]
		});

		meta({
			"entity": "object",
			"name": "errorDetails",
			"properties": [{
				"name": "functionName",
				"type": "string"
			}, {
				"name": "signature",
				"type": "string"
			}, {
				"name": "nonMatchingSignatures",
				"type": "array"
			}]
		});

		function ImplementationNotFound (errorDetails) {
			this.setDetails(errorDetails);
			this.joinNonMatchingSignatures();
			this.renderMessage();
			this._super.constructor.call(this, this.message);
		}

		extendError(ImplementationNotFound);

		ImplementationNotFound.prototype.setDetails = function  (errorDetails) {
			this.functionName = errorDetails.functionName || "unknown";
			this.signature = errorDetails.invocationSignature || "[no arguments]";
			this.nonMatchingSignatures = errorDetails.nonMatchingSignatures || [];
		};

		ImplementationNotFound.prototype.joinNonMatchingSignatures = function  () {
			if (this.nonMatchingSignatures.length) {
				this.nonMatchingSignatures = "("+ this.nonMatchingSignatures.join("), (") +")";
			} else {
				this.nonMatchingSignatures = "unknown";
			}
		};

		ImplementationNotFound.prototype.renderMessage = function  () {
			var error = this,
				messageTemplate = "Function {{functionName}} was called with the signature ({{invocationSignature}}). A matching implementation does not exist. Existing implementation signatures: {{implementationSignatures}}",
				placeholders = /\{\{([^}]+)\}\}/g;
			this.message = messageTemplate.replace(placeholders, function (withCurlies, placeholder) {
				return error[placeholder];
			});
		};

		function extendError (Child) {
			var Surrogate = function () {},
				proto;
			Surrogate.prototype = Error.prototype;
			proto = new Surrogate();
			proto._super = Error.prototype;
			proto.constructor = Child;
			Child.prototype = proto;
		}

		return ImplementationNotFound;
	}
);