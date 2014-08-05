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
	})

	meta({
		"name": "from",
		"static": true,
		"shim": true,
		"description": "Gets a real array from an array-like object",
		"arguments": [{
			"name": "arrayLike",
			"type": "object",
			"description": "Any object with a length property and indexed values; such as arguments"
		}],
		"returns": "array"
	})*/

	require("../class/shim");

	Array.shimStatic("from", function (arrayLike) {
		return this.prototype.slice.call(arrayLike);
	});
});