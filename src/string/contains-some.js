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
	require("../array/shim");
	require("../array/from");
	require("./contains");
	require("../function/shim");
	require("../function/constrict");

	var meta = require("../meta");

	String.method(
		meta({
			"name": "containsSome",
			"description": "Tests for the presence of some of many substrings in string",
			"arguments": [{
				"name": "substrings",
				"type": "string",
				"repeating": true
			}],
			"returns": "boolean"
		}),
		containsSome
	);

	function containsSome (substrings) {
		return Array.from(arguments).some(this.contains.bind(this).constrict(0, 1));
	}
});