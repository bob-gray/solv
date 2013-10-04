/* jshint evil:true */

define(function () {
	"use strict";

	meta({
		"entity": "module",
		"description": "Runtime shim for meta()",
		"export": "function"
	});

	meta({
		"entity": "function",
		"name": "meta",
		"arguments": [{
			"name": "data",
			"type": "object",
			"description": "Must be written as valid JSON. This allows meta to be extracted and parsed by documentation systems."
		}],
		"returns": {
			"type": "object",
			"description": "data (object passed in)"
		}
	});

	function meta (data) {
		var ext = data["extends"],
			mixins = data.mixins;
		if (ext) {
			data["extends"] = get(ext);
		}
		if (mixins) {
			data.mixins = get(mixins);
		}
		return data;
	}

	function get (key) {
		var value;
		if (isArray(key)) {
			value = getFromKeyArray(key);
		} else {
			value = getFromKey(key);
		}
		return value;
	}

	function isArray (value) {
		return "Array" === Object.prototype.toString.call(value).slice(8, -1);
	}

	function getFromKeyArray (keyArray) {
		return mapKeys(keyArray, getFromKey);
	}

	function getFromKey (key) {
		var value;
		if (isIdentifier(key)) {
			value = getGlobal(key);
		}
		if (isUndefined(value)) {
			value = getModule(key);
		}
		if (isUndefined(value)) {
			throw "Unable to get the value of "+ key;
		}
		return value;
	}

	function mapKeys (array, callback) {
		var mapped = [];
		arrayLoop(array, function (key) {
			mapped.push(callback(key));
		});
		return mapped;
	}

	function isIdentifier (key) {
		return isIdentifier.identifier.test(key);
	}

	isIdentifier.identifier = /^(?!(?:\.|$))(?:(?:\.(?!$))?[_$a-zA-Z]+[_$a-zA-Z0-9]*)+$/;

	function isUndefined (value) {
		return typeof value === "undefined";
	}

	function getGlobal (key) {
		try {
			return globalEval(key);
		} catch (ignore) {}
	}

	function getModule (key) {
		try {
			return require(key);
		} catch (ignore) {}
	}

	function arrayLoop (array, callback) {
		var i = 0,
			length = array.length;
		for (; i < length; i += 1) {
			callback(array[i]);
		}
	}

	function globalEval (key) {
		var getter = new Function("return "+ key +";");
		return getter();
	}

	return meta;
});
