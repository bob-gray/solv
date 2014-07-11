/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/method");
	require("../shim/array");

	var meta = require("../meta");

	/*meta({
		"name": "Array",
		"type": "class",
		"global": true
	});*/
	
	Array.method(
		meta({
			"name": "add",
			"shim": true,
			"descriptions": "Push an item onto the array only if it isn't already found in the array",
			"arguments": [{
				"name": "item",
				"type": "any"
			}]
		}),
		add
	);
	
	function add (item) {
		var index = this.indexOf(item);
		
		if (isNotFound(index)) {
			this.push(item);
		}
	}
	
	function isNotFound (index) {
		return index === -1;
	}
	
	return add;
});