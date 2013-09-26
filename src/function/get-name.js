define(function () {
	"use strict";

	Function.prototype.getName = function getFuncName () {
		var name = this.name;
		if (!name) {
			name = getNameFromFunctionString(this);
		}
		return name;
	};

	var regex = /^\s*function\s+([^\s(]+)?/;

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
