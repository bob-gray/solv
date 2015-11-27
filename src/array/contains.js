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
	require("../array/shim");

	var meta = require("../meta");
	
	Array.method(
		meta({
			"name": "contains",
			"description": "Tests for the presence of an item in array",
			"arguments": [{
				"name": "item",
				"type": "any"
			}],
			"returns": "boolean"
		}),
		contains
	);
	
	function contains (item) {
		return this.indexOf(item) > -1;
	}
});