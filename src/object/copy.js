define(
	[
		"../meta",
		"../class/shim"
	],
	function (meta) {
		"use strict";
		
		Object.staticShim(copy);
		
		function copy (object) {
			return Object.merge({}, object);
		}
		
		copy.deep = function (object) {
			return Object.merge.deep({}, object);
		};
	}	
);