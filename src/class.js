/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	/*meta({
		"type": "module",
		"exports": "class/create",
		"description": "Class building with easy inheritance, mixins, method overloading, default properties, default arguments, return type checking and more. This module is a convenience module for loading all class submodules. Think of it as loading class/*. Returns createClass function returned from class/create module."
	})*/
	
	require("./class/extend");
	require("./class/method");
	require("./class/mixin");
	require("./class/shim");
	require("./class/singleton");
	require("./class/inject-super");

	return require("./class/create");
});
