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

	meta({
		"name": "getDefaults",
		"description": "Pulls out default values from properties meta data",
		"arguments": [{
			"name": "items",
			"type": "object",
			"description": "Members should be objects with a option default property"
		}],
		"returns": {
			"type": "object",
			"description": "An object suitable for merging with a target to fulfill defaults"
		}
	});

	meta({
		"name": "getDefaults",
		"description": "Pulls out default values from arguments meta data",
		"arguments": [{
			"name": "items",
			"type": "array",
			"description": "Members should be objects with a option default property"
		}],
		"returns": {
			"type": "array",
			"description": "An array suitable for merging with a target to fulfill defaults"
		}
	});

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