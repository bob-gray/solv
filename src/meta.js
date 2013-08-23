define(function () {
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
		if (notModuleName(key)) {
			try {
				value = globalEval(key);
			} catch (ignore) {}
		}
		if (isUndefined(value)) {
			try {
				value = require(key);
			} catch (ignore) {}
		}
		if (isUndefined(value)) {
			throw "Unable to get the value of "+ key;
		}
	}

	function isUndefined (value) {
		return typeof value === "undefined";
	}

	isIdentifier.identifier = /^(?!(?:\.|$))(?:(?:\.(?!$))?[_$a-zA-Z]+[_$a-zA-Z0-9]*)+$/;

	function isIdentifier (key) {
		return isIdentifier.identifier.test(key);
	}

	function globalEval (key) {
		var getter = new Function("return "+ key +";");
		return getter();
	}

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
		"return": {
			"type": "object",
			"description": "The data the was passed in"
		}
	});

	return meta;
});
