define(
	[
		"../meta",
		"../type",
		"./method",
		"../function/constrict",
		"../shim/object",
		"../shim/array",
		"../shim/function"
	],
	function (meta, type) {
		"use strict";

		meta({
			"type": "module",
			"description": "Augments Function prototype with mixin method for decorating a constructor function's prototype"
		});

		meta({
			"name": "Function",
			"type": "class",
			"global": true
		});

		if (!Function.prototype.mixin) {
			Function.method(
				meta({
					"type": "method",
					"name": "mixin",
					"description": "Each item in the array will mixed in",
					"arguments": [{
						"name": "mixins",
						"type": "array",
						"items": "function|object"
					}],
					"returns": "function"
				}),
				mixinArray
			);

			Function.method(
				meta({
					"type": "method",
					"name": "mixin",
					"description": "Constructor's own instance methods will be appended directly to function's prototype",
					"arguments": [{
						"name": "Constructor",
						"type": "function"
					}],
					"returns": "function"
				}),
				mixinClass
			);
			
			Function.method(
				meta({
					"type": "method",
					"name": "mixin",
					"description": "Objects own methods will be appended directly to function's prototype",
					"arguments": [{
						"name": "mixins",
						"type": "object"
					}],
					"returns": "function"
				}),
				mixin
			);
		}
		
		function mixinArray (mixins) {
			mixins.forEach(this.mixin.constrict(1), this);
			return this;
		}
		
		function mixinClass (Constructor) {
			return this.mixin(Constructor.prototype);
		}

		function mixin (mixins) {
			Object.keys(mixins)
				.filter(isFunction, mixins)
				.forEach(attachMethod.bind(this, mixins));
			return this;
		}

		function isFunction (name) {
			return type.is("function", this[name]);
		}

		function attachMethod (mixins, name) {
			this.prototype[name] = mixins[name];
		}
	}
);
