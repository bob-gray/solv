/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"name": "InvalidEventParams",
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
	})*/

	var createErrorType = require("./create"),
		InvalidEventParams = createErrorType({
			name: "InvalidEventParams",
			message: "{{eventName}} event should be triggered with ({{expected}}) "+
					"but was triggered with ({{actual}}) instead",
			details: {
				eventName: "unknown",
				expected: "unknown",
				actual: "unknown"
			}
		});

	return InvalidEventParams;
});