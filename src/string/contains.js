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

	var meta = require("../meta");

	String.method(
		meta({
			"name": "contains",
			"description": "Tests for the presence of a substring in string",
			"arguments": [{
				"name": "substring",
				"type": "string"
			}],
			"returns": "boolean"
		}),
		contains
	);

	function contains (substring) {
		return String(this).indexOf(substring) > -1;
	}
});