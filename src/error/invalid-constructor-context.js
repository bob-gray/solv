if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta"),
		createErrorType = require("./create");

	meta({
		"name": "InvalidConstructorContext",
		"extends": "Error",
		"arguments": [{
			"name": "details",
			"type": "object",
			"required": false,
			"properties": {
				"className": "string"
			}
		}]
	});

	var InvalidConstructorContext = createErrorType({
		name: "InvalidConstructorContext",
		message: "{{className}} constructor was called with an invalid context "+
				"(this) caused by a missing new operator or from applying a "+
				"context that isn't an instance of this class",
		details: {
			className: ""	
		}
	});

	return InvalidConstructorContext;
});