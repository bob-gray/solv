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
	require("../array/from");

	var meta = require("../meta");

	Array.method(
		meta({
			"name": "replace",
			"description": "Replaces all occurences of an item",
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
		var index = this.length,
			replacements = Array.from(arguments).slice(1),
			args;

		while (index) {
			index -= 1;

			if (this[index] === item) {
				args = [index, 1].concat(replacements);
				this.splice.apply(this, args);
			}
		}
	}
});