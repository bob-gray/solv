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

	var meta = require("./meta");

	meta({
		"type": "module",
		"exports": "class/create",
		"description": "System for creating classes with easy inheritance, mixins, method overloading, default properties, default arguments, return type checking and more. This modules a only a convenience module. Think of it as loading class/*"
	});

	return require("./class/create");
});
