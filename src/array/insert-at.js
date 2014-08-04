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
				"description": "Where to insert items"
			}, {
				"name": "item",
				"type": "any",
				"repeating": true,
				"description": "All additional arguments are inserted"
			}]
		}),
		insertAt
	);
	
	function insertAt () {
		var args = Array.from(arguments);

		// howMany = 0 into args so no items are removed
		args.splice(1, 0, 0);

		return this.splice.apply(this, args);
	}
});