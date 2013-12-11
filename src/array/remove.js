if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/method");
	require("../shim/array");

	var meta = require("../meta");

	meta({
		"name": "Array",
		"type": "class",
		"global": true
	});
	
	Array.method(
		meta({
			"name": "remove",
			"shim": true,
			"descriptions": "Removes the first occurrence of an item from an array",
			"arguments": [{
				"name": "item",
				"type": "any"
			}]
		}),
		remove
	);
	
	function remove (item) {
		var index = this.indexOf(item);
		
		if (isFound(index)) {
			this.splice(index, 1);
		}
	}
	
	function isFound (index) {
		return index > -1;
	}
	
	return remove;
});