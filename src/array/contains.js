if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/method");
	require("../shim/array");

	var meta = require("../meta");

	meta({
		"name": "Array",
		"type": "class",
		"global": true
	});
	
	Array.method(
		meta({
			"name": "contains",
			"description": "Tests for the presence of an item in an array",
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
	
	return contains;
});