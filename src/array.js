define(
	[
		"./meta"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "module",
			"export": "Array",
			"description": "Augments global Array class"
		});

		meta({
			"entity": "method",
			"for": "Array",
			"name": "fromArguments",
			"static": true,
			"description": "Gets a real array from an arguments object.",
			"arguments": [{
				"name": "args",
				"type": "arguments",
				"description": "An arguments object from within a function"
			}],
			"return": "array"
		});

		meta({
			"name": "forEach",
			"entity": "method",
			"for": "Array",
			"polyfill": true,
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
			"entity": "method",
			"for": "Array",
			"name": "map",
			"polyfill": true,
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
			"return": "array"
		});

		meta({
			"entity": "method",
			"for": "Array",
			"name": "filter",
			"polyfill": true,
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
			"return": "array"
		});

		var slice = Array.prototype.slice;

		Array.fromArguments = function (args) {
			return slice.call(args, 0);
		};

		if (!Array.prototype.forEach) {
			Array.prototype.forEach = function(callback, context) {
				var i = 0,
					len = this.length;

				for (; i < len; ++i) {
					callback.call(context, this[i], i, this);
				}
			};
		}

		if (!Array.prototype.map) {
			Array.prototype.map = function (callback, context) {
				var mapped = [];
				this.forEach(map);
				function map (element, index, array) {
					mapped[index] = callback.call(context, element, index, array);
				}
				return mapped;
			};
		}

		if (!Array.prototype.filter) {
			Array.prototype.filter = function (callback, context) {
				var filtered = [];
				this.forEach(map);
				function filter (element, index, array) {
					if (callback.call(context, element, index, array)) {
						filtered.push(element);
					}
				}
				return filtered;
			};
		}
	}
);
