define(
	[
		"../meta",
		"../type",
		"../object/for-each"
	],
	function (meta, type) {
		"use strict";
		
		meta({
			"name": "getDefaults",
			"description": "Pulls out default values from arguments and properties meta data",
			"arguments": [{
				"name": "items",
				"type": "object|array",
				"description": "Members should be objects with a option default property"
			}],
			"returns": {
				"type": "object|array",
				"description": "An object or array suitable for merging with a target to fulfill defaults"
			}
		});
		
		function getDefaults (items) {
			var defaults;
			
			if (type.is("object", items)) {
				defaults = {};
			
			} else if (type.is("array", items)) {
				defaults = [];
			}
			
			if (defaults) {
				Object.forEach(items, populate, defaults);
			}
			
			return defaults;
		}
		
		function populate (item, key) {
			var defaultValue = item["default"];
			
			if (type.is.not("undefined", defaultValue)) {
				this[key] = defaultValue;
			}
		}
		
		return getDefaults;
	}
);