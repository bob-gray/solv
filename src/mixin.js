define(
	[
		"./meta",
		"./type",
		"./method"
	],
	function (meta, type) {
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
			Object.keys(mixins).filter(isFunction).forEach(attachMethod);

			function isFunction (name) {
				return type.is("function", mixins[name]);
			}

			function attachMethod (name) {
				Constructor.method(name, mixins[name]);
			}

			return Constructor;
		}
	}
);
