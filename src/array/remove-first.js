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
	require("../shim/array");

	var meta = require("../meta");

	Array.method(
		meta({
			"name": "removeFirst",
			"description": "Removes the first occurrence of an item",
			"arguments": [{
				"name": "item",
				"type": "any"
			}]
		}),
		removeFirst
	);

	function removeFirst (item) {
		var index = this.indexOf(item);

		if (isFound(index)) {
			this.splice(index, 1);
		}
	}

	function isFound (index) {
		return index > -1;
	}
});