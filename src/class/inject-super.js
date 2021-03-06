/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"name": "Function",
		"type": "class",
		"global": true
	})

	meta({
		"name": "injectSuper",
		"description": "Creates method proxy that injects access to superMethod",
		"arguments": [{
			"name": "superMethod",
			"type": "function",
			"description": "Becomes accessible within method as this.superCall and this.superApply",
			"required": false
		}],
		"returns": {
			"name": "proxy",
			"type": "function"
		}
	})*/
	
	Function.prototype.injectSuper = injectSuper;

	var emptyContext = this,
		primitive = /^string|number|boolean$/;

	function injectSuper (superMethod) {
		var method = this;

		if (!superMethod) {
			superMethod = new SuperMethodAbstract();
		}

		return function () {
			var temp = {};

			if (isPrimitive(this)) {
				execute.call(this, temp, method, arguments);

			} else {
				setup.call(this, temp, superMethod);
				execute.call(this, temp, method, arguments);
				cleanup.call(this, temp);	
			}

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

	function isPrimitive (context) {
		return primitive.test(typeof context);
	}
});