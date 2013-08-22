define(
	[
		"./meta",
		"./method",
		"./type"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "module",
			"description": "Augments Function prototype"
		});

		meta({
			"entity": "class",
			"name": "Function",
			"global": true
		});

		Function.method(
			meta({
				"entity": "method",
				"name": "mixin",
				"description": "",
				"arguments": [{
					"name": "mixins",
					"type": "object",
					"description": ""
				}],
				"return": "function"
			}),
			mixin
		);

		Function.method(
			meta({
				"entity": "method",
				"name": "mixin",
				"description": "",
				"arguments": [{
					"name": "constructor",
					"type": "function",
					"description": ""
				}],
				"return": "function"
			}),
			function (constructor) {
				return mixin.call(this, constructor.prototype)
			}
		);

		function mixin (mixins) {
			var Constructor = this;

			Object.keys(options.mixin).filter(isFunction).forEach(attachMethod);

			function isFunction (name) {
				return type.is("function", options.mixin[name]);
			}

			function attachMethod (name) {
				Constructor.method(name, options.mixin[name]);
			}

			return Constructor;
		}
	}
);
