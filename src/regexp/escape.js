/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"name": "RegExp",
		"type": "class",
		"global": true
	})*/

	require("../class/method");

	var meta = require("../meta"),
		specials = /[-\\^$*+?.()|[\]{}]/g;

	RegExp.method(
		meta({
			"name": "escape",
			"static": true,
			"description": "Inserts escape slashes before all regular expression meta characters found in a string",
			"arguments": [{
				"name": "source",
				"type": "string"
			}],
			"returns": "string"
		}),
		escape
	);

	function escape (source) {
		return source.replace(specials, "\\$&");
	}
});