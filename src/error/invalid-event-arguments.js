if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta"),
		createErrorType = require("./create");

	meta({
		"name": "InvalidEventArguments",
		"extends": "Error",
		"arguments": [{
			"name": "details",
			"type": "object",
			"required": false,
			"properties": {
				"eventName": "string",
				"expected": "string",
				"actual": "string"
			}
		}]
	});

	var InvalidEventArguments = createErrorType({
		name: "InvalidEventArguments",
		message: "{{eventName}} event should be triggered with ({{expected}}) "+
				"but was triggered with ({{actual}}) instead",
		details: {
			eventName: "unknown",
			expected: "unknown",
			actual: "unknown"
		}
	});

	return InvalidEventArguments;
});