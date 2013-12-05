define(
	[
		"solv/meta",
		"solv/class/shim"
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

		Date.shim(now);

		var shims = {
			now: now
		};

		function now () {
			return new Date().getTime();
		}

		return shims;
	}
);