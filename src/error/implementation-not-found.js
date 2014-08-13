/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var ImplementationNotFound,
		createErrorType = require("./create");

	ImplementationNotFound = createErrorType({
		name: "ImplementationNotFound",
		message: "Function {{functionName}} was called with the signature ({{signature}}). "+
				"A matching implementation does not exist. Existing implementation signatures: {{nonMatchingSignatures}}",
		details: {
			functionName: "unknown",
			nonMatchingSignatures: [],
			signature: "unknown"
		}
	}, init);

	function init () {
		this.joinNonMatchingSignatures();
		this.setSignature();
	}
	
	ImplementationNotFound.prototype.joinNonMatchingSignatures = function () {
		var signatures = this.details.nonMatchingSignatures;
		
		if (signatures.length) {
			signatures = "("+ signatures.join("), (") +")";

		} else {
			signatures = "unknown";
		}
		
		this.details.nonMatchingSignatures = signatures;
	};
	
	ImplementationNotFound.prototype.setSignature = function () {
		if ("" === this.details.signature) {
			this.details.signature = "[no arguments]";
		}
	};

	return ImplementationNotFound;
});