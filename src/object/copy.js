if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/shim");
	require("./merge");

	var meta = require("../meta");

	Object.shimStatic(copy);
	
	function copy (object) {
		return Object.merge({}, object);
	}
	
	copy.deep = function (object) {
		return Object.merge.deep({}, object);
	};

	return copy;
});