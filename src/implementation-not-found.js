define(
	[
		"./meta"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "class",
			"name": "ImplementationNotFound",
			"extends": "Error",
			"arguments": [{
				"name": "functionName",
				"type": "string"
			}, {
				"name": "invocationSignature",
				"type": "string"
			}, {
				"name": "implementationSignatures",
				"type": "array.string"
			}]
		});

		function ImplementationNotFound (functionName, invocationSignature, implementationSignatures) {
			this.functionName = functionName || "unknown";
			this.invocationSignature = invocationSignature || "[no arguments]";
			this.implementationSignatures = implementationSignatures;
			normalizeMessageParts.apply(this);
			renderMessage.apply(this);
			this._super.constructor.call(this, this.message);
		}

		ImplementationNotFound.prototype = ExtendError();

		function normalizeMessageParts () {
			if (this.implementationSignatures && this.implementationSignatures.length) {
				this.implementationSignatures = "("+ this.implementationSignatures.join("), (") +")";
			} else {
				this.implementationSignatures = "";
			}
		}

		function renderMessage () {
			var messageTemplate = "Function {{functionName}} was called with the signature ({{invocationSignature}}). A matching implementation does not exist. Existing implementation signatures: {{implementationSignatures}}",
				placeholders = /\{\{([^}]+)\}\}/g;
			this.message = messageTemplate.replace(placeholders, function (withCurlies, placeholder) {
				return this[placeholder];
			});
		}

		function ExtendError () {
			var E = function () {},
				proto = new E();
			E.prototype = Error.prototype;
			ImplementationNotFound.prototype = proto;
			proto._super = Error.prototype;
			proto.constructor = ImplementationNotFound;
		}

		return ImplementationNotFound;
	}
);