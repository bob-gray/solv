/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"name": "createErrorType",
		"type": "function",
		"descrition": "Creates a new sub class of Error",
		"arguments": [{
			"name": "options",
			"type": "object",
			"properties": {
				"name": {
					"type": "string",
					"description": "Name of the new error class/type"
				},
				"message": {
					"type": "string",
					"description": "Placeholders wrapped in double curly brackets are replaced with details: {{placehoder}}"
				},
				"details": {
					"type": "object",
					"description": "Default detail values"
				}
			}
		}, {
			"name": "init",
			"type": "function",
			"required": "false",
			"description": "Called before message is rendered and super Error is called"
		}],
		"returns": {
			"type": "function",
			"description": "Constructor function for a new error class/type (sub class of Error)"
		}
	})*/

	require("../class/extend");
	require("../function/shim");

	var type = require("../type"),
		placeholders = /\{\{([^}]+)\}\}/g;

	function createErrorType (options, init) {
		
		function ErrorType (details) {
			this.name = options.name;
			this.details = Object.merge.deep({}, options.details, details || {});

			if (type.is("function", init)) {
				init.call(this);
			}
			
			this.renderMessage(options.message);
			this.constructor.Super.call(this, this.message);
		}

		ErrorType.extend(Error);
		
		ErrorType.prototype.renderMessage = renderMessage;
		
		return ErrorType;
	}

	function renderMessage (template) {
		this.message = template.replace(placeholders, supplant.bind(this));
	}

	function supplant (_, key) {
		return this.details[key];
	}

	return createErrorType;
});