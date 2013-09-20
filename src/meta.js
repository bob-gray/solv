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
			"description": "Must be written as valid JSON including quoted key names. This allows meta to be extracted and parsed by documentation systems."
		}],
		"returns": {
			"type": "object",
			"description": "The data the was passed in"
		}
	});

	function meta (data) {
		var ext = data["extends"],
			mixin = data.mixin;
		if (ext) {
			data["extends"] = get(ext);
		}
		if (mixin) {
			data.mixin = get(mixin);
		}
		return data;
	}

	function get (key) {
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

	isIdentifier.identifier = /^(?!(?:\.|$))(?:(?:\.(?!$))?[_$a-zA-Z]+[_$a-zA-Z0-9]*)+$/;

	function isIdentifier (key) {
		return isIdentifier.identifier.test(key);
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

	function isUndefined (value) {
		return typeof value === "undefined";
	}

	function globalEval (key) {
		var getter = new Function("return "+ key +";");
		return getter();
	}

	return meta;
});
