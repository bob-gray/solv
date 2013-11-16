define(
	[
		"../meta"
	],
	function (meta) {
		"use strict";

		meta({
			"name": "Function",
			"type": "class",
			"global": true
		});

		meta({
			"name": "injectSuper",
			"description": "Higher-order function that creates a proxy function which while the the original being invoked injects instance methods on the context of superCall and superApply",
			"arguments": [{
				"name": "superMethod",
				"type": "function",
				"description": "Becomes accessible on the context from superCall or superApply while method is executing",
				"required": false
			}],
			"return": "function"
		});

		if (!Function.prototype.injectSuper) {
			Function.prototype.injectSuper = injectSuper;
		}

		var temp = {},
			emptyContext = this;

		function injectSuper (superMethod) {
			var method = this;
			if (!superMethod) {
				superMethod = new SuperMethodAbstract();
			}
			return function () {
				setup.call(this, superMethod);
				execute.call(this, method, arguments);
				cleanup.call(this);
				return temp.result;
			};
		}

		function setup (superMethod) {
			if (this !== emptyContext) {
				prep.call(this);
				inject.call(this, superMethod);
			}
		}

		function prep () {
			temp.superCall = this.superCall;
			temp.superApply = this.superApply;
		}

		function inject (superMethod) {
			this.superCall = superMethod;
			this.superApply = superApply(superMethod);
		}

		function execute (method, args) {
			temp.result = method.apply(this, args);
		}

		function cleanup () {
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
	}
);
