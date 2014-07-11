/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/method");
	require("../array/from");

	var meta = require("../meta");

	/*meta({
		"name": "Array",
		"type": "class",
		"global": true
	});*/

	Array.method(
		meta({
			"name": "of",
			"static": true,
			"shim": true,
			"description": "Creates an array of the arguments passed to it",
			"arguments": [{
				"name": "item",
				"type": "any",
				"required": false,
				"repeating": true
			}],
			"returns": "array"
		}),
		of
	);
	
	function of () {
		return this.from(arguments);
	}
});