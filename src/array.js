/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"type": "module",
		"description": "A convenience module for loading all array submodules. Think of it as loading array/*"
	})*/

	require("./array/add");
	require("./array/contains");
	require("./array/copy");
	require("./array/empty");
	require("./array/first");
	require("./array/from");
	require("./array/insert-at");
	require("./array/is-empty");
	require("./array/last");
	require("./array/of");
	require("./array/remove");
	require("./array/remove-first");
	require("./array/remove-last");
	require("./array/replace");
	require("./shim/array");
});