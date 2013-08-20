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
			"implementation": function (method) {
				var args = Array.fromArguments(arguments).slice(1);
				return method.apply(this, args);
			}
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
			"implementation": function (method) {
				var args = Array.fromArguments(arguments).slice(1);
				return this[method].apply(this, args);
			}
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
			"implementation": function (method) {
				var args = Array.fromArguments(arguments).slice(1);
				return method.apply.bind(method, this, args);
			}
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
			"implementation": function (method) {
				var args = Array.fromArguments(arguments).slice(1);
				method = this[method];
				return method.apply.bind(method, this, args);
			}
		}));
	}
);