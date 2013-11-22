define(
	[
		"../meta",
		"../class/shim"
	],
	function (meta) {
		"use strict";

		meta({
			"type": "module",
			"description": "Augments Date prototype"
		});

		meta({
			"name": "Date",
			"type": "class",
			"global": true
		});

		meta({
			"name": "now",
			"description": "returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC",
			"static": true,
			"shim": true,
			"arguments": [],
			"returns": "number"
		});

		var shims = {};

		function now () {
			return new Date().getTime();
		}

		shims.now = now;

		Date.shim(now);

		return shims;
	}
);