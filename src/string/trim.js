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

	var meta = require("../meta"),
		whitespace = "[\\s\\uFEFF\\xA0]+",
		leading = new RegExp("^"+ whitespace),
		trailing = new RegExp(whitespace +"$"),
		both = new RegExp("^"+ whitespace +"|"+ whitespace +"$", "g");

	String.method(
		meta({
			"name": "trim",
			"shim": true,
			"description": "Removes whitespace from the front and end of a string",
			"arguments": [],
			"returns": "string"
		}),
		trim
	);

	String.method(
		meta({
			"name": "trimLeft",
			"shim": true,
			"description": "Removes whitespace from the front of a string",
			"arguments": [],
			"returns": "string"
		}),
		trimLeft
	);

	String.method(
		meta({
			"name": "trimRight",
			"shim": true,
			"description": "Removes whitespace from the end of a string",
			"arguments": [],
			"returns": "string"
		}),
		trimRight
	);

	function trim () {
		return this.replace(both, "");
	}

	function trimLeft () {
		return this.replace(leading, "");
	}

	function trimRight () {
		return this.replace(trailing, "");
	}
});