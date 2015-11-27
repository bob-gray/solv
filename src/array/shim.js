/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"name": "Array",
		"type": "class",
		"global": true
	})

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
	})

	meta({
		"name": "indexOf",
		"shim": true,
		"description": "Returns the first index at which a given element can be found in the array, or -1 if it is not present.",
		"arguments": [{
			"name": "element",
			"type": "any"
		}, {
			"name": "from",
			"type": "number",
			"required": false,
			"description": "The index to start the search"
		}],
		"returns": "number"
	})

	meta({
		"name": "lastIndexOf",
		"shim": true,
		"description": "Returns the last index at which a given element can be found in the array, or -1 if it is not present.",
		"arguments": [{
			"name": "element",
			"type": "any"
		}, {
			"name": "from",
			"type": "number",
			"required": false,
			"description": "The index to start the search"
		}],
		"returns": "number"
	})

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
	})

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
	})

	meta({
		"name": "find",
		"shim": true,
		"description": "Finds the first value that returns true from the callback.",
		"arguments": [{
			"name": "callback",
			"type": "function",
			"description": "Function to test each element of the array."
		}, {
			"name": "context",
			"type": "object",
			"description": "Object to use as this when executing callback."
		}],
		"returns": "any"
	})

	meta({
		"name": "findIndex",
		"shim": true,
		"description": "Finds the index of the first value that returns true from the callback",
		"arguments": [{
			"name": "callback",
			"type": "function",
			"description": "Function to test each element of the array."
		}, {
			"name": "context",
			"type": "object",
			"description": "Object to use as this when executing callback."
		}],
		"returns": "number"
	})

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
	})

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
	})

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
	})*/

	require("../class/shim");

	var methods = [
			"forEach",
			"reduce",
			"indexOf",
			"lastIndexOf",
			"map",
			"fill",
			"find",
			"findIndex",
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

	shims.indexOf = function (element, from) {
		var length = this.length,
			found = -1,
			index = normalizeFrom(from || 0, length);		

		for (; index < length; index += 1) {

			if (this[index] === element) {
				found = index;
				break;
			}
		}

		return found;
	};

	shims.lastIndexOf = function (element, from) {
		var length = this.length,
			found = -1,
			index = normalizeFrom(from || length, length);		

		for (; index >= 0; index -= 1) {

			if (this[index] === element) {
				found = index;
				break;
			}
		}

		return found;
	};

	function normalizeFrom (from, length) {
		if (from < 0) {
			from = atLeastZero(from + length);
		}

		return from;
	}

	function atLeastZero (number) {
		return Math.max(number, 0);
	}

	shims.map = function (callback, context) {

		/* jshint -W072 */ //native APIs have 4 parameters
		return this.reduce(function (mapped, element, index, array) {
			mapped[index] = callback.call(context, element, index, array);

			return mapped;
		}, []);
	};

	shims.filter = function (callback, context) {

		/* jshint -W072 */ //native APIs have 4 parameters
		return this.reduce(function (filtered, element, index, array) {

			if (callback.call(context, element, index, array)) {
				filtered.push(element);
			}

			return filtered;
		}, []);
	};

	shims.find = function (callback, context) {
		var index = this.findIndex(callback, context);

		return this[index];
	};

	shims.findIndex = function (callback, context) {
		var length = this.length,
			index = 0,
			element,
			found = -1;		

		for (; index < length; index += 1) {
			element = this[index];

			/* jshint -W072 */ //native APIs have 4 parameters
			if (callback.call(context, element, index, this)) {
				found = index;
				break;
			}
		}

		return found;
	};

	shims.every = function (callback, context) {

		/* jshint -W072 */ //native APIs have 4 parameters
		return this.reduce(function (result, element, index, array) {

			if (result) {
				result = !!callback.call(context, element, index, array);
			}

			return result;
		}, true);
	};

	shims.some = function (callback, context) {

		/* jshint -W072 */ //native APIs have 4 parameters
		return this.reduce(function (result, element, index, array) {

			if (!result) {
				result = !!callback.call(context, element, index, array);
			}

			return result;
		}, false);
	};

	shims.fill = function (element, from, to) {
		var length = this.length,
			index = normalizeFrom(from || 0, length),
			end = normalizeFrom(to || length, length);

		for (; index < end; index += 1) {
			this[index] = element;
		}

		return this;
	};

	Array.shim("forEach", shims.forEach);
	
	methods.forEach(attachIfUndefined);

	function attachIfUndefined (method) {
		Array.shim(method, shims[method]);
	}

	return shims;
});