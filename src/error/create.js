if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/extend");
	require("../class/super");
	require("../shim/function");

	var meta = require("../meta"),
		type = require("../type"),
		placeholders = /\{\{([^}]+)\}\}/g;

	meta({
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
				"details": {
					"type": "object",
					"description": "Default detail values"
				},
				"message": {
					"type": "string",
					"description": "Placeholders wrapped in double curly brackets are replaced with details: {{placehoder}}"
				}
			}
		}, {
			"name": "init",
			"type": "function",
			"require": "false",
			"description": "Called before message is rendered and super Error is called"
		}],
		"returns": {
			"type": "function",
			"description": "Constructor function for a new error class/type (sub class of Error)"
		}
	});

	function createErrorType (options, init) {
		
		function ErrorType (details) {
			this.name = options.name;
			this.details = Object.merge.deep({}, options.details, details || {});

			if (type.is("function", init)) {
				init.call(this);
			}
			
			this.renderMessage(options.message);
			this.constructor.Super.call(this.message);
		}

		ErrorType.extend(Error);

		if (type.is("function", init)) {
			init = init.injectSuper(ErrorType.Super);
		}
		
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