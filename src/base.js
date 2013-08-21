define(
	[
		"./meta",
		"./class",
		"./type",
		"./bind",
		"./array"
	],
	function (meta, Class, type) {
		var Base = Class(
			meta({
				"entity": "class",
				"name": "Base",
				"description": "Abstract class."
			})
		);

		Base.method(
			meta({
				"name": "superConstructor",
				"description": "Calls this._super.constructor with this as the context.",
				"arguments": [{
					"type": "any",
					"required": false,
					"repeating": true
				}]
			}),
			superConstructor
		);

		Base.method(
			meta({
				"name": "superConstructorApply",
				"description": "Applies this._super.constructor with this as the context.",
				"signature": "arguments|array",
				"arguments": [{
					"type": "arguments|array",
					"name": "args",
					"required": false
				}]
			}),
			superConstructorApply
		);

		Base.method(
			meta({
				"name": "superInvoke",
				"description": "Invokes a super method with this as the context.",
				"arguments": [{
					"type": "string",
					"name": "method",
					"required": true
				}, {
					"type": "any",
					"required": false,
					"repeating": true
				}],
				"returns": "any"
			}),
			superInvoke
		);

		Base.method(
			meta({
				"name": "superApply",
				"description": "Invokes a super method with this as the context; applying args.",
				"arguments": [{
					"type": "arguments|array",
					"name": "args",
					"required": false
				}],
				"returns": "any"
			}),
			superApply
		);

		Base.method(
			meta({
				"name": "invoke",
				"description": "Useful for invoking local functions as private methods.",
				"arguments": [{
					"type": "function",
					"name": "fn"
				}, {
					"type": "any",
					"required": false,
					"repeating": true
				}],
				"returns": "any"
			}),
			invokeFunction
		);

		Base.method(
			meta({
				"name": "invoke",
				"description": "Included for consistency with the proxy method api.",
				"arguments": [{
					"type": "string",
					"name": "method"
				}, {
					"type": "any",
					"required": false,
					"repeating": true
				}],
				"returns": "any"
			}),
			invokeMethod
		);

		Base.method(
			meta({
				"name": "proxy",
				"description": "Creates a function bound to this; useful for attaching event listeners.",
				"arguments": [{
					"type": "function",
					"name": "fn",
					"description": "Any function in scope. Doesn't need to be a public method."
				}, {
					"type": "any",
					"required": false,
					"repeating": true
				}],
				"returns": "function"
			}),
			proxyFunction
		);

		Base.method(
			meta({
				"name": "proxy",
				"description": "Creates a function bound to this; useful for attaching event listeners.",
				"arguments": [{
					"type": "string",
					"name": "method",
					"description": "The name of the method to bind."
				}, {
					"type": "any",
					"required": false,
					"repeating": true
				}],
				"returns": "function"
			}),
			proxyMethod
		);

		Base.prototype._super = {};

		function superConstructor () {
			return this._super.constructor.apply(this, arguments);
		}

		function superConstructorApply (args) {
			return this._super.constructor.apply(this, args);
		}

		function superInvoke (method) {
			var args = Array.fromArguments(arguments).slice(1);
			return this.superApply(method, args);
		}

		function superApply (method, args) {
			var superMethod = this._super[method];
			if (type.is("function", superMethod)) {
				return this._super[method].apply(this, args);
			}
		}

		function invokeMethod (method) {
			var args = Array.fromArguments(arguments).slice(1);
			return this[method].apply(this, args);
		}

		function invokeFunction (fn) {
			var args = Array.fromArguments(arguments).slice(1);
			return fn.apply(this, args);
		}

		function proxyMethod (method) {
			var args = Array.fromArguments(arguments),
				fn = this[method];
			args.splice(0, 1, this);
			return fn.bind.apply(fn, args);
		}

		function proxyFunction (fn) {
			var args = Array.fromArguments(arguments);
			args.splice(0, 1, this);
			return fn.bind.apply(fn, args);
		}

		return Base;
	}
);