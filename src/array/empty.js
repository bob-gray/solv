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
			"name": "empty",
			"description": "Empties all items from array",
			"arguments": []
		}),
		empty
	);
	
	function empty () {
		this.length = 0;
	}
});