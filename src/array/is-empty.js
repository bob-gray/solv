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
	})*/

	require("../class/method");

	var meta = require("../meta");
	
	Array.method(
		meta({
			"name": "isEmpty",
			"description": "Test if array has length",
			"arguments": [],
			"returns": "boolean"
		}),
		isEmpty
	);
	
	function isEmpty () {
		return this.length > 0;
	}
});