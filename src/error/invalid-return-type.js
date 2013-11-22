define(
	[
		"solv/meta"
	],
	function (meta) {
		"use strict";

		meta({
			"type": "class",
			"name": "InvalidReturnType",
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
			"properties": [{
				"name": "functionName",
				"type": "string",
				"default": ""
			}, {
				"name": "actualReturnType",
				"type": "string"
			}, {
				"name": "expectedReturnType",
				"type": "string"
			}]
		});

		function InvalidReturnType (errorDetails) {
			this.setDetails(errorDetails || {});
			this.renderMessage();
			this._super.constructor.call(this, this.message);
		}

		extendError(InvalidReturnType);

		InvalidReturnType.prototype.setDetails = function  (errorDetails) {
			this.functionName = errorDetails.functionName || "";
			this.actualReturnType = errorDetails.actualReturnType;
			this.expectedReturnType = errorDetails.expectedReturnType;
		};

		InvalidReturnType.prototype.renderMessage = function  () {
			var error = this,
				messageTemplate = "Function {{functionName}} returned a {{actualReturnType}}; "+
					"return type expected to be {{expectedReturnType}}",
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

		return InvalidReturnType;
	}
);