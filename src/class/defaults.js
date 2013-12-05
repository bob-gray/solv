define(
	[
		"../meta",
		"../type",
		"../object/for-each",
		"../shim/array"
	],
	function (meta, type) {
		"use strict";
		
		var defaults = {
			properties: function (properties) {
				var defaults = {};
				
				if (properties) {
					Object.forEach(properties, populate, defaults);
				}
				
				return defaults;
			},
			
			args: function (args) {
				var defaults = [];
				
				if (args) {
					args.forEach(populate, defaults);
				}
				
				return defaults;
			}
		};
		
		function populate (item, key) {
			var defaultValue = item["default"];
			
			if (type.is.not("undefined", defaultValue)) {
				this[key] = defaultValue;
			}
		}
		
		return defaults;
	}
);