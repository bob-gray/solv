/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var InvalidEventParams,
		createErrorType = require("./create");

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