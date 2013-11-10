define(function () {
	function meta (data) {
		return data;
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
