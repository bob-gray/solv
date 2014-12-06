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
	require("../shim/array");
	require("../array/from");
	require("./contains");
	require("../shim/function");
	require("../function/constrict");

	var meta = require("../meta");

	String.method(
		meta({
			"name": "containsEvery",
			"description": "Tests for the presence of every substrings in string",
			"arguments": [{
				"name": "substrings",
				"type": "string",
				"repeating": true
			}],
			"returns": "boolean"
		}),
		containsEvery
	);

	function containsEvery (substrings) {
		return Array.from(arguments).every(this.contains.bind(this).constrict(0, 1));
	}
});