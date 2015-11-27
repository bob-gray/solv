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
	require("./from");

	var meta = require("../meta");
	
	Array.method(
		meta({
			"name": "insertAt",
			"description": "Insert items into array",
			"arguments": [{
				"name": "index",
				"type": "number",
				"description": "Where to insert items. Negative number will insert from the end of array."
			}, {
				"name": "item",
				"type": "any",
				"repeating": true,
				"description": "All additional arguments are inserted"
			}]
		}),
		insertAt
	);
	
	function insertAt (index) {
		var args = Array.from(arguments),
			deleteCount = 0;

		if (index > this.length) {
			// ensure insert occurs at index by forcing sparse array
			this[index - 1] = void 0; 
		}

		// insert zero deleteCount with zero deleteCount
		args.splice(1, deleteCount, deleteCount);

		this.splice.apply(this, args);
	}
});