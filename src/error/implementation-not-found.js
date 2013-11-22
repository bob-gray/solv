define(
	[
		"solv/meta"
	],
	function (meta) {
		"use strict";

		meta({
			"name": "ImplementationNotFound",
			"type": "class",
			"extends": "Error",
			"arguments": [{
				"name": "errorDetails",
				"type": "object",
				"required": false
			}]
		});

		meta({
			"type": "object",
			"name": "errorDetails",
			"properties": {
				functionName: {
					"type": "string",
					"default": "unknown"
				},
				"signature": {
					"type": "string",
					"default": "unknown"
				},
				"nonMatchingSignatures": {
					"type": "array",
					"default": "unknown"
				}
			}
		});

		function ImplementationNotFound (errorDetails) {
			this.setDetails(errorDetails || {});
			this.joinNonMatchingSignatures();
			this.renderMessage();
			this._super.constructor.call(this, this.message);
		}

		extendError(ImplementationNotFound);

		ImplementationNotFound.prototype.setDetails = function  (errorDetails) {
			this.functionName = errorDetails.functionName || "unknown";
			this.nonMatchingSignatures = errorDetails.nonMatchingSignatures || [];
			if ("" === errorDetails.signature) {
				this.signature = "[no arguments]";
			} else if (!errorDetails.signature) {
				this.signature = "unknown";
			} else {
				this.signature =  errorDetails.signature;
			}
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
				messageTemplate = "Function {{functionName}} was called with the signature ({{signature}}). "+
					"A matching implementation does not exist. Existing implementation signatures: {{nonMatchingSignatures}}",
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