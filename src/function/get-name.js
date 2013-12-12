if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta");	

	meta({
		"name": "Function",
		"type": "class",
		"global": true
	});
	
	meta({
		"name": "getName",
		"shim": true,
		"description": "Gets the name of a named function",
		"arguments": [],
		"returns": "string|undefined"
	});

	if (!Function.prototype.getName) {
		Function.prototype.getName = getName;
	}

	var regex = /^\s*function\s+([^\s(]+)?/;
	
	function getName () {
		var name = this.name;

		if (!name) {
			name = getNameFromFunctionString(this);
		}

		return name;
	}

	function getNameFromFunctionString (func) {
		var name,
			funcString = func.toString(),
			match = regex.exec(funcString);

		if (match && match[1]) {
			name = match[1];
		}

		return name;
	}
});
