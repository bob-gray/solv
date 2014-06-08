/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta"),
		createErrorType = require("./create");

	meta({
		"name": "InvalidPropertyType",
		"extends": "Error",
		"arguments": [{
			"name": "details",
			"type": "object",
			"required": false,
			"properties": {
				"name": "string",
				"expected": "string",
				"actual": "string"
			}
		}]
	});

	var InvalidPropertyType = createErrorType({
		name: "InvalidPropertyType",
		message: "Property {{name}} should be {{expected}} "+
				"but was set to {{actual}} instead",
		details: {
			name: "unknown",
			expected: "unknown",
			actual: "unknown"
		}
	});

	return InvalidPropertyType;
});