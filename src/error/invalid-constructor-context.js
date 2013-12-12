if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta");

	meta({
		"name": "InvalidConstructorContext",
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
			"name": "className",
			"type": "string"
		}]
	});

	function InvalidConstructorContext (errorDetails) {
		this.setDetails(errorDetails || {});
		this.renderMessage();
		this._super.constructor.call(this, this.message);
	}

	extendError(InvalidConstructorContext);

	InvalidConstructorContext.prototype.setDetails = function (errorDetails) {
		this.className = errorDetails.className || "";
	};

	InvalidConstructorContext.prototype.renderMessage = function  () {
		var error = this,
			messageTemplate = "{{className}} constructor was called with an invalid context (this) "+
					"caused by a missing new operator or from applying a context that isn't "+
					"an instance of this class",
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

	return InvalidConstructorContext;
});