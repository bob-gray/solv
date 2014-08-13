/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var InvalidReturnType,
		createErrorType = require("./create");

	InvalidReturnType = createErrorType({
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