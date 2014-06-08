/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/shim");

	var meta = require("../meta");

	meta({
		"name": "Array",
		"type": "class",
		"global": true
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
		"name": "indexOf",
		"shim": true,
		"description": "Returns the first index at which a given element can be found in the array, or -1 if it is not present.",
		"arguments": [{
			"name": "element",
			"type": "start"
		}, {
			"name": "from",
			"type": "number",
			"required": false,
			"description": "The index to start the search"
		}],
		"returns": "number"
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

	meta({
		"name": "every",
		"shim": true,
		"description": "Tests whether all elements in the array pass the test implemented by callback",
		"arguments": [{
			"name": "callback",
			"type": "function",
			"description": "Function to execute for each element"
		}, {
			"name": "context",
			"type": "object",
			"description": "Object to use as this when executing callback",
			"required": false
		}],
		"returns": {
			"type": "boolean",
			"description": "True if callback returns a truthy value for each item"
		}
	});

	meta({
		"name": "some",
		"shim": true,
		"description": "Tests whether some element in the array passes the test implemented by callback",
		"arguments": [{
			"name": "callback",
			"type": "function",
			"description": "Function to execute for each element"
		}, {
			"name": "context",
			"type": "object",
			"description": "Object to use as this when executing callback",
			"required": false
		}],
		"returns": {
			"type": "boolean",
			"description": "True if callback returns a truthy value for any item"
		}
	});

	var methods = [
			"forEach",
			"reduce",
			"indexOf",
			"map",
			"filter",
			"every",
			"some"
		],
		shims = {};

	shims.forEach = function(callback, context) {
		var i = 0,
			len = this.length;

		for (; i < len; i += 1) {
			callback.call(context, this[i], i, this);
		}
	};

	shims.reduce = function (callback, initialValue) {
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

	shims.indexOf = function (element, start) {
		var len = this.length,
			found = -1,
			i;

		if (!start) {
			start = 0;

		} else if (start < 0) {
			start = Math.max(len + start, 0);
		}

		for (i = start; i < len; i += 1) {

			if (i in this && element === this[i]) {
				found = i;
				break;
			}
		}

		return found;
	};

	/* jshint -W072 */ //Array extras map, filter, every, some native APIs have 4 parameters
	shims.map = function (callback, context) {

		return this.reduce(function (mapped, element, index, array) {
			mapped[index] = callback.call(context, element, index, array);

			return mapped;
		}, []);
	};

	shims.filter = function (callback, context) {

		return this.reduce(function (filtered, element, index, array) {

			if (callback.call(context, element, index, array)) {
				filtered.push(element);
			}

			return filtered;
		}, []);
	};

	shims.every = function (callback, context) {

		return this.reduce(function (result, element, index, array) {

			if (result) {
				result = !!callback.call(context, element, index, array);
			}

			return result;
		}, true);
	};

	shims.some = function (callback, context) {

		return this.reduce(function (result, element, index, array) {

			if (!result) {
				result = !!callback.call(context, element, index, array);
			}

			return result;
		}, false);
	};

	/* jshint +W072 */

	Array.shim("forEach", shims.forEach);
	
	methods.forEach(attachIfUndefined);

	function attachIfUndefined (method) {
		Array.shim(method, shims[method]);
	}

	return shims;
});