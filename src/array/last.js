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
			"name": "last",
			"description": "Gets the last item in array",
			"arguments": [],
			"returns": "any"
		}),
		last
	);
	
	function last () {
		return this[this.length - 1];
	}
});