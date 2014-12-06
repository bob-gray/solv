/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"type": "module",
		"description": "A convenience module for loading all public date submodules. Think of it as loading date/*"
	})*/

	require("./date/compare");
	require("./date/format");
	require("./date/hours-from-standard");
	require("./date/is-daylight-savings");
	require("./date/is-leap-year");
	require("./date/move");
	require("./shim/date");
});