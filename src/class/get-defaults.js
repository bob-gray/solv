/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../function/abstract");
	require("../object/for-each");
	require("../shim/array");
	require("../function/overload");

	var meta = require("../meta"),
		type = require("../type");

	var getDefaults = Function.Abstract("getDefaults");
	
	function getDefaultsObject (items) {
		var defaults = {};
		
		Object.forEach(items, populate, defaults);
		
		return defaults;
	}
	
	function getDefaultsArray (items) {
		var defaults = [];
		
		items.forEach(populate, defaults);
		
		return defaults;
	}
	
	function populate (item, key) {
		var defaultValue = item["default"];
		
		if (type.is.not("undefined", defaultValue)) {
			this[key] = defaultValue;
		}
	}
	
	return getDefaults
			.overload("object", getDefaultsObject)
			.overload("array", getDefaultsArray);
});