define(
	[
		"./meta",
		"./class/create",
		"./class/extend",
		"./class/method",
		"./class/mixin",
		"./class/super"
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
