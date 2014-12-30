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
	require("./array/average");
	require("./array/contains");
	require("./array/copy");
	require("./array/empty");
	require("./array/first");
	require("./array/from");
	require("./array/insert-at");
	require("./array/is-empty");
	require("./array/last");
	require("./array/max");
	require("./array/min");
	require("./array/of");
	require("./array/remove-first");
	require("./array/remove-last");
	require("./array/remove");
	require("./array/replace-first");
	require("./array/replace-last");
	require("./array/replace");
	require("./array/sum");
	require("./shim/array");
});