/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"name": "String",
		"type": "class",
		"global": true
	})*/

	require("../class/method");

	var meta = require("../meta");

	String.method(
		meta({
			"name": "repeat",
			"description": "Repeats a string n number of times",
			"arguments": [{
				"name": "count",
				"type": "number",
				"description": "Number of times to repeat string"
			}],
			"returns": "string"
		}),
		repeat
	);

	function repeat (count) {
		return new Array(count + 1).join(this);
	}
});