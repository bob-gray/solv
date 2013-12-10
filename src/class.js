if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";
	
	require("./class/extend");
	require("./class/method");
	require("./class/mixin");
	require("./class/shim");
	require("./class/singleton");
	require("./class/super");

	var meta = require("solv/meta"),
		createClass = require("solv/class/create");

	meta({
		"type": "module",
		"exports": "createClass",
		"description": "System for creating classes"
	});

	return createClass;
});
