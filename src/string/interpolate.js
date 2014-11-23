/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"name": "String",
		"type": "class",
		"global": true
	})*/

	require("../class/method");
	require("../function/curry");
	require("../regexp/escape");

	var meta = require("../meta");

	String.method(
		meta({
			"name": "interpolate",
			"description": "Replace placeholders with values from a scope object",
			"arguments": [{
				"name": "scope",
				"type": "object",
				"description": "Top level key names should correspond to placeholders"
			}, {
				"name": "beginning",
				"type": "string",
				"default": "{",
				"description": "Characters to identifying the beginning of a placeholder"
			}, {
				"name": "ending",
				"type": "string",
				"default": "}",
				"description": "Characters to identifying the ending of a placeholder"
			}],
			"returns": "string"
		}),
		interpolate
	);

	function interpolate (scope, beginning, ending) {
		var placeholder = buildRegExp(beginning, ending),
			withScope = replacer.curry(scope);

		return this.replace(placeholder, withScope);
	}

	function buildRegExp (beginning, ending) {
		return new RegExp(RegExp.escape(beginning) +"(.*?)"+ RegExp.escape(ending), "g");
	}

	function replacer (scope, placeholder, key) {
		return scope[key];
	}
});