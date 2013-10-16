define(
	[
		"../meta",
		"../type",
		"./method",
		"../shim/object",
		"../shim/array"
	],
	function (meta, type) {
		"use strict";

		meta({
			"entity": "module",
			"description": "Augments Function prototype with mixin method for decorating a constructor function's prototype."
		});

		meta({
			"entity": "class",
			"name": "Function",
			"global": true
		});

		if (!Function.prototype.mixin) {
			Function.method(
				meta({
					"entity": "method",
					"name": "mixin",
					"description": "Objects own methods will be appended to function's prototype.",
					"arguments": [{
						"name": "mixins",
						"type": "object"
					}],
					"returns": "function"
				}),
				mixin
			);

			Function.method(
				meta({
					"entity": "method",
					"name": "mixin",
					"description": "Constructor's own methods will be appended to function's prototype.",
					"arguments": [{
						"name": "constructor",
						"type": "function"
					}],
					"returns": "function"
				}),
				function (constructor) {
					return mixin.call(this, constructor.prototype);
				}
			);

			Function.method(
				meta({
					"entity": "method",
					"name": "mixin",
					"description": "Object's and Constructor's own methods will be appended to function's prototype.",
					"arguments": [{
						"name": "mixins",
						"type": "array",
						"description": "Array of objects or constructor functions"
					}],
					"returns": "function"
				}),
				function (mixins) {
					mixins.forEach(mixinConstructorOrObject, this);
					return this;
				}
			);
		}

		function mixinConstructorOrObject (mixin, index, array) {
			this.mixin(mixin);
		}

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
