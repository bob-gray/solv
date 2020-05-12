/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

var Symbol;

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

	var type = require("../type");

	Array.shimStatic("from", function (arrayLike, map, context) {
		var array;

		if (type.is.not("array", arrayLike) && Symbol && Symbol.iterator && arrayLike[Symbol.iterator]) {
			array = fromIterator(arrayLike);
		} else {
			array = this.prototype.slice.call(arrayLike);
		}

		if (map) {
			array = array.map(map, context);
		}

		return array;
	});

	function fromIterator (arrayLike) {
		var array = [],
			iterator = arrayLike[Symbol.iterator](),
			item = iterator.next();

		while (!item.done) {
			array.push(item.value);
			item = iterator.next();
		}

		return array;
	}
});