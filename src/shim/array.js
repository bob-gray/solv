define(
	[
		"../meta"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "module",
			"description": "Augments Array prototype"
		});

		meta({
			"entity": "class",
			"name": "Array",
			"global": true
		});

		meta({
			"name": "fromArguments",
			"static": true,
			"description": "Gets a real array from an arguments object.",
			"arguments": [{
				"name": "args",
				"type": "arguments",
				"description": "An arguments object from within a function"
			}],
			"returns": "array"
		});

		meta({
			"name": "forEach",
			"shim": true,
			"description": "Executes a provided function once per array element.",
			"arguments": [{
				"name": "callback",
				"type": "function",
				"description": "Function to execute for each element."
			}, {
				"name": "context",
				"type": "object",
				"description": "Object to use as this when executing callback.",
				"required": false
			}]
		});

		meta({
			"name": "map",
			"shim": true,
			"description": "Creates a new array with the results of calling a provided function on every element in this array.",
			"arguments": [{
				"name": "callback",
				"type": "function",
				"description": "Function that produces an element of the new Array from an element of the current one."
			}, {
				"name": "context",
				"type": "object",
				"description": "Object to use as this when executing callback."
			}],
			"returns": "array"
		});

		meta({
			"name": "filter",
			"shim": true,
			"description": "Creates a new array with all elements that pass the test implemented by the provided function.",
			"arguments": [{
				"name": "callback",
				"type": "function",
				"description": "Function to test each element of the array."
			}, {
				"name": "context",
				"type": "object",
				"description": "Object to use as this when executing callback."
			}],
			"returns": "array"
		});

		meta({
			"name": "reduce",
			"shim": true,
			"description": "Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.",
			"arguments": [{
				"name": "callback",
				"type": "function",
				"description": "Function to execute on each value in the array. Each return is passed to the next execution."
			}, {
				"name": "initialValue",
				"type": "any",
				"description": "Value to be use as the first argument to the first call of the callback."
			}],
			"returns": "array"
		});

		var slice = Array.prototype.slice,
			shimMethods = ["map", "filter", "reduce", "every", "some"],
			arrayShims = {};

		Array.fromArguments = function (args) {
			return slice.call(args, 0);
		};

		arrayShims.forEach = function(callback, context) {
			var i = 0,
				len = this.length;
			for (; i < len; i += 1) {
				callback.call(context, this[i], i, this);
			}
		};

		arrayShims.reduce = function (callback, initialValue) {
			var initialValueIsEmpty = "undefined" === typeof initialValue,
				value = initialValue;
			this.forEach(function (element, index, array) {
				if (initialValueIsEmpty && 0 === index) {
					value = element;
				} else {
					value = callback(value, element, index, array);
				}
			});
			return value;
		};

		/* jshint -W072 */ //Array extras map, filter, every, some native APIs have 4 parameters
		arrayShims.map = function (callback, context) {
			return this.reduce(function (mapped, element, index, array) {
				mapped[index] = callback.call(context, element, index, array);
				return mapped;
			}, []);
		};

		arrayShims.filter = function (callback, context) {
			return this.reduce(function (filtered, element, index, array) {
				if (callback.call(context, element, index, array)) {
					filtered.push(element);
				}
				return filtered;
			}, []);
		};

		arrayShims.every = function (callback, context) {
			return this.reduce(function (result, element, index, array) {
				if (result) {
					result = !!callback.call(context, element, index, array);
				}
				return result;
			}, true);
		};

		arrayShims.some = function (callback, context) {
			return this.reduce(function (result, element, index, array) {
				if (!result) {
					result = !!callback.call(context, element, index, array);
				}
				return result;
			}, false);
		};
		/* jshint +W072 */

		if (!Array.prototype.forEach) {
			Array.prototype.forEach = arrayShims.forEach;
		}

		shimMethods.forEach(attachIfNoNative);

		function attachIfNoNative (method) {
			if (!Array.prototype[method]) {
				Array.prototype[method] = arrayShims[method];
			}
		}

		return arrayShims;
	}
);
