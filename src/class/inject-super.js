/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("./shim");

	var meta = require("../meta");

	meta({
		"name": "Function",
		"type": "class",
		"global": true
	});

	meta({
		"name": "injectSuper",
		"shim": true,
		"description": "Higher-order function that creates a proxy function which while the the original being invoked injects instance methods on the context of superCall and superApply",
		"arguments": [{
			"name": "superMethod",
			"type": "function",
			"description": "Becomes accessible on the context from superCall or superApply while method is executing",
			"required": false
		}],
		"return": "function"
	});
	
	Function.shim("injectSuper", injectSuper);

	var emptyContext = this;

	function injectSuper (superMethod) {
		var method = this;

		if (!superMethod) {
			superMethod = new SuperMethodAbstract();
		}

		return function () {
			var temp = {};

			setup.call(this, temp, superMethod);
			execute.call(this, temp, method, arguments);
			cleanup.call(this, temp);

			return temp.result;
		};
	}

	function setup (temp, superMethod) {
		if (this !== emptyContext) {
			prep.call(this, temp);
			inject.call(this, superMethod);
		}
	}

	function prep (temp) {
		temp.superCall = this.superCall;
		temp.superApply = this.superApply;
	}

	function inject (superMethod) {
		this.superCall = superMethod;
		this.superApply = superApply(superMethod);
	}

	function execute (temp, method, args) {
		temp.result = method.apply(this, args);
	}

	function cleanup (temp) {
		if (this !== emptyContext) {
			this.superCall = temp.superCall;
			this.superApply = temp.superApply;
		}
	}

	function superApply (superMethod) {
		return function (args) {
			return superMethod.apply(this, args);
		};
	}

	function SuperMethodAbstract () {
		return function () {
			throw new Error("No super implementation exists for method");
		};
	}
});