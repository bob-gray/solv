/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../shim/object");
	require("../class/shim");

	var meta = require("../meta");

	meta({
		"name": "Object",
		"type": "class",
		"global": true
	});

	meta({
		"name": "isEmpty",
		"static": true,
		"shim": true,
		"description": "Check to see if a object has no own properties",
		"arguments": [{
			"name": "object",
			"type": "object"
		}],
		"returns": "boolean"
	});

	Object.shimStatic(isEmpty);

	function isEmpty (object) {
		var ownProperties = [];
		
		if (Object.getOwnPropertyNames) {
			ownProperties = Object.getOwnPropertyNames(object);
		
		} else {
			ownProperties = Object.keys(object);
		}
		
		return 0 === ownProperties.length;
	}

	return isEmpty;
});