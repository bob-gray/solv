if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	meta({
		"name": "meta",
		"type": "function",
		"description": "A meta-json compatible runtime meta implementation.",
		"arguments": [{
			"name": "data",
			"type": "object",
			"description": "Must be written as valid JSON. This allows meta data to easily be used during static analysis."
		}],
		"returns": {
			"name": "data",
			"type": "object",
			"description": "The JSON literal object argument with the properties mixins and extends having been transformed"
		}
	});

	var local = {};

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

	meta.define = function (key, value) {
		local[key] = value;
	};

	meta.undefine = function (key) {
		delete local[key];
	};

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
		var value = getLocal(key);

		if (isUndefined(value) && isIdentifier(key)) {
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

	function getLocal (key) {
		return local[key];
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
		/* jshint evil:true */
		var getter = new Function("return "+ key +";");

		return getter();
	}

	return meta;
});
