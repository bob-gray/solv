if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta"),
		createErrorType = require("./create");

	meta({
		"name": "InvalidReturnType",
		"extends": "Error",
		"arguments": [{
			"name": "details",
			"type": "object",
			"required": false,
			"properties": {
				"functionName": "string",
				"expected": "string",
				"actual": "string"
			}
		}]
	});

	var InvalidReturnType = createErrorType({
		name: "InvalidReturnType",
		message: "Function {{functionName}} returned a {{actual}}; "+
				"return type expected to be {{expected}} instead",
		details: {
			functionName: "unknown",
			expected: "unknown",
			actual: "unknown"
		}
	});

	return InvalidReturnType;
});