/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var InvalidConstructorContext,
		createErrorType = require("./create");

	InvalidConstructorContext = createErrorType({
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