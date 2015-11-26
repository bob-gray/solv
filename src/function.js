/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"type": "module",
		"description": "A convenience module for loading all public function submodules. Think of it as loading function/*"
	})*/

	require("./function/abstract");
	require("./function/constrict");
	require("./function/curry");
	require("./function/debounce");
	require("./function/default-args");
	require("./function/get-name");
	require("./function/overload");
	require("./function/throttle");
	require("./function/validate-return-type");
	require("./function/shim");
});