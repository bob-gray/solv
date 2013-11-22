define(
	[
		"solv/meta",
		"solv/class/create",
		"solv/class/extend",
		"solv/class/method",
		"solv/class/mixin",
		"solv/class/super"
	],
	function (meta, createClass) {
		"use strict";

		meta({
			"type": "module",
			"export": "createClass",
			"description": "System for creating classes"
		});

		return createClass;
	}
);
