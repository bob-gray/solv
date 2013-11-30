define(
	[
		"solv/meta"
	],
	function (meta) {
		"use strict";

		meta({
			"name": "InvalidPropertyType",
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
				"name": "name",
				"type": "string"
			}, {
				"name": "expected",
				"type": "string"
			}, {
				"name": "actual",
				"type": "string"
			}]
		});

		function InvalidPropertyType (errorDetails) {
			this.setDetails(errorDetails || {});
			this.renderMessage();
			this._super.constructor.call(this, this.message);
		}

		extendError(InvalidPropertyType);

		InvalidPropertyType.prototype.setDetails = function (errorDetails) {
			this.name = errorDetails.name || "";
			this.expected = errorDetails.expected;
			this.actual = errorDetails.actual;
		};

		InvalidPropertyType.prototype.renderMessage = function  () {
			var error = this,
				messageTemplate = "Property '{{name}}' should be {{expected}} "+
						"but was set to {{actual}}",
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

		return InvalidPropertyType;
	}
);