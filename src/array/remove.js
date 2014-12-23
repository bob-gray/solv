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
			"name": "remove",
			"description": "Removes the all occurrence of an item",
			"arguments": [{
				"name": "item",
				"type": "any"
			}]
		}),
		remove
	);
	
	function remove (item) {
		var index = this.length;

		while (index) {
			index -= 1;

			if (this[index] === item) {
				this.splice(index, 1);
			}
		}
	}
});