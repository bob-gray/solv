define(function () {
	"use strict";

	var regex = /^\s*function\s+([^(]+)?/;

	function getFuncName () {
		var name = this.name;
		if (!name) {
			name = regex.exec(this.toString())[1];
		}
		return name;
	}

	Function.prototype.getName = getFuncName;
});
