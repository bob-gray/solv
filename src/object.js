/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"type": "module",
		"description": "A convenience module for loading all public object submodules. Think of it as loading object/*"
	})*/

	require("./object/clone");
	require("./object/copy");
	require("./object/for-each");
	require("./object/is-empty");
	require("./object/merge");
	require("./object/validate");
	require("./object/shim");
});