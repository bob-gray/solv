/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var InvalidPropertyType,
		createErrorType = require("./create");

	InvalidPropertyType = createErrorType({
		name: "InvalidPropertyType",
		message: "Property {{name}} should be {{expected}} but was set to {{actual}} instead",
		details: {
			name: "unknown",
			expected: "unknown",
			actual: "unknown"
		}
	});

	return InvalidPropertyType;
});