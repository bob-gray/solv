/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/shim");

	var meta = require("../meta");

	meta({
		"name": "Date",
		"type": "class",
		"global": true
	});

	meta({
		"name": "now",
		"static": true,
		"shim": true,
		"description": "returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC",
		"arguments": [],
		"returns": "number"
	});

	Date.shimStatic("now", now);

	var shims = {
		now: now
	};

	function now () {
		return new Date().getTime();
	}

	return shims;
});