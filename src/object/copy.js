/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/method");
	require("./merge");

	var meta = require("../meta");

	/*meta({
		"name": "Object",
		"type": "class",
		"global": true
	})*/

	Object.method(
		meta({
			"name": "copy",
			"static": true,
			"shim": true,
			"description": "Creates a shallow copy of own properties that are not null or undefined.",
			"arguments": [{
				"name": "source",
				"type": "object"
			}],
			"returns": "object"
		}),
		copy
	);
	
	function copy (object) {
		return Object.merge({}, object);
	}
});