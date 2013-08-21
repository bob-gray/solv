define(
	[
		"./meta",
		"./class",
		"./bind",
		"./array"
	],
	function (meta, Class) {
		var Base = Class();

		Base.method(meta({
			"entity": "method",
			"for": "Base",
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
			"entity": "method",
			"for": "Base",
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
			"entity": "method",
			"for": "Base",
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
			"entity": "method",
			"for": "Base",
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
			return method.bind.apply(method, this, args);
		}

		return Base;
	}
);