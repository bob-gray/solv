if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta");

	meta({
		"name": "InvalidEventArguments",
		"type": "class",
		"extends": "Error",
		"arguments": [{
			"name": "errorDetails",
			"type": "object",
			"required": false
		}]
	});

	meta({
		"name": "errorDetails",
		"type": "object",
		"properties": [{
			"name": "eventName",
			"type": "string"
		}, {
			"name": "actualArgumentsSignature",
			"type": "string"
		}, {
			"name": "expectedArgumentsSignature",
			"type": "string"
		}]
	});

	function InvalidEventArguments (errorDetails) {
		this.setDetails(errorDetails || {});
		this.renderMessage();
		this._super.constructor.call(this, this.message);
	}

	extendError(InvalidEventArguments);

	InvalidEventArguments.prototype.setDetails = function (errorDetails) {
		this.eventName = errorDetails.functionName || "";
		this.actualArgumentsSignature = errorDetails.actualArgumentsSignature;
		this.expectedArgumentsSignature = errorDetails.expectedArgumentsSignature;
	};

	InvalidEventArguments.prototype.renderMessage = function  () {
		var error = this,
			messageTemplate = "Event '{{functionName}}' should be triggered with ({{expectedArgumentsSignature}}) "+
					"but was triggered with ({{actualArgumentsSignature}}",
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

	return InvalidEventArguments;
});