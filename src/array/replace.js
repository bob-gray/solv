/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function(require) {
	"use strict";

	/*meta({
		"name": "Array",
		"type": "class",
		"global": true
	})*/

	require("../class/method");
	require("../shim/array");
	require("../array/from");

	var meta = require("../meta");
	
	Array.method(
		meta({
			"name": "replace",
			"description": "Replaces the first occurence of an item",
			"arguments": [{
				"name": "item",
				"type": "any"
			}, {
				"name": "replacement",
				"type": "any",
				"repeating": true
			}]
		}),
		replace
	);

	function replace (item) {
		var index = this.indexOf(item),
			replacements = Array.from(arguments).slice(1);

		if (isFound(index)) {
			this.splice.apply(this, [index, 1].concat(replacements));
		}
	}

	function isFound (index) {
		return index > -1;
	}
});