define(
	[
		"../meta",
		"../type",
		"../object/for-each"
	],
	function (meta, type) {
		"use strict";
		
		function getDefaults (properties) {
			var defaults = {};
			
			Object.forEach(properties, populate, defaults);
			
			return defaults;
		}
		
		function populate (property, key) {
			var default_ = property["default"];
			
			if (type.is.not("undefined", default_)) {
				this[key] = default_;
			}
		}
		
		return getDefaults;
	}
);