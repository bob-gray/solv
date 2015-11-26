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
			"name": "removeLast",
			"description": "Removes the last occurrence of an item",
			"arguments": [{
				"name": "item",
				"type": "any"
			}]
		}),
		removeLast
	);

	function removeLast (item) {
		var index = this.lastIndexOf(item);

		if (isFound(index)) {
			this.splice(index, 1);
		}
	}

	function isFound (index) {
		return index > -1;
	}
});