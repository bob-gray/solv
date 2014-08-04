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
	})*/

	require("../class/method");
	require("../shim/array");

	var meta = require("../meta");
	
	Array.method(
		meta({
			"name": "add",
			"description": "Pushes an item onto array only if it isn't already found in array",
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
});