define(
	[
		"./meta",
		"./class",
		"./type",
		"./bind",
		"./array"
	],
	function (meta, Class, type) {
		var Base = Class();

		meta({
			"entity": "class",
			"name": "Base",
			"description": "Abstract class."
		});

		Base.method(meta({
			"name": "superConstructor",
			"description": "Calls this._super.constructor with this as the context.",
			"arguments": [{
				"type": "any",
				"required": false,
				"repeating": true
			}],
			"implementation": superConstructor
		}));

		Base.method(meta({
			"name": "superConstructorApply",
			"description": "Applies this._super.constructor with this as the context.",
			"signature": "arguments|array",
			"arguments": [{
				"type": "arguments|array",
				"name": "args",
				"required": false
			}],
			"implementation": superConstructorApply
		}));

		Base.method(meta({
			"name": "superInvoke",
			"description": "Invokes a super method with this as the context.",
			"signature": "string,any*",
			"arguments": [{
				"type": "string",
				"name": "method",
				"required": true
			}, {
				"type": "any",
				"required": false,
				"repeating": true
			}],
			"implementation": superInvoke
		}));

		Base.method(meta({
			"name": "superApply",
			"description": "Invokes a super method with this as the context; applying args.",
			"signature": "arguments|array",
			"arguments": [{
				"type": "arguments|array",
				"name": "args",
				"required": false
			}],
			"implementation": superApply
		}));

		Base.method(meta({
			"name": "invoke",
			"description": "Useful for invoking local functions as private methods",
			"signature": "function, any*",
			"arguments": [{
				"type": "function",
				"name": "method"
			}, {
				"type": "any",
				"required": false,
				"repeating": true
			}],
			"implementation": invokeFunction
		}));

		Base.method(meta({
			"name": "invoke",
			"signature": "string, any*",
			"arguments": [{
				"type": "string",
				"name": "method"
			}, {
				"type": "any",
				"required": false,
				"repeating": true
			}],
			"implementation": invokeMethod
		}));

		Base.method(meta({
			"name": "proxy",
			"signature": "function, any*",
			"arguments": [{
				"type": "function",
				"name": "method"
			}, {
				"type": "any",
				"required": false,
				"repeating": true
			}],
			"implementation": proxyFunction
		}));

		Base.method(meta({
			"name": "proxy",
			"signature": "string, any*",
			"arguments": [{
				"type": "function",
				"name": "method"
			}, {
				"type": "any",
				"required": false,
				"repeating": true
			}],
			"implementation": proxyMethod
		}));

		Base.prototype._super = {};

		function superConstructor () {
			return this._super.constructor.apply(this, arguments);
		}

		function superConstructorApply (args) {
			return this._super.constructor.apply(this, args);
		}

		function superInvoke (method) {
			var args = Array.fromArguments(arguments).slice(1);
			return this.superInvoke(method, args);
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

		function invokeFunction (method) {
			var args = Array.fromArguments(arguments).slice(1);
			return method.apply(this, args);
		}

		function proxyFunction (fn) {
			var args = Array.fromArguments(arguments);
			args.splice(0, 1, this);
			return fn.bind.apply(fn, args);
		}

		function proxyMethod (method) {
			var args = Array.fromArguments(arguments).slice(1),
				method = this[method];
			args.splice(0, 1, this);
			return method.bind.apply(method, args);
		}

		return Base;
	}
);