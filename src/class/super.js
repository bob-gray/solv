define(
	[
		"../meta"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "module",
			"export": "injectSuper",
			"description": "super methods"
		});

		meta({
			"entity": "function",
			"name": "injectSuper",
			"description": "Generates a proxy function with injected instance methods of superCall and superApply",
			"arguments": [{
				"name": "method",
				"type": "function",
				"description": "This function is executed by the proxy function with the same context and arguments"
			}, {
				"name": "superMethod",
				"type": "function",
				"description": "This function accessible on the context from superCall or superApply while method is executing",
				"required": false
			}],
			"return": {
				"type": "function",
				"description": "A proxy for method"
			}
		});

		var temp = {};

		function injectSuper (method, superMethod) {
			if (!superMethod) {
				superMethod = new SuperMethodAbstract();
			}
			return function () {
				prep.call(this);
				inject.call(this, superMethod);
				execute.call(this, method, arguments);
				cleanup.call(this);
				return temp.result;
			};
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
			this.superCall = temp.superCall;
			this.superApply = temp.superApply;
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

		return injectSuper;
	}
);
