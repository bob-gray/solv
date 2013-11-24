define(
	[
		"solv/meta",
		"solv/shim/object",
		"solv/class/shim"
	],
	function (meta) {
		"use strict";

		meta({
			"name": "Object",
			"type": "class",
			"global": true
		});

		meta({
			"name": "isEmpty",
			"static": true,
			"shim": true,
			"description": "Check to see if a object has no own properties",
			"arguments": [{
				"name": "object",
				"type": "object"
			}],
			"returns": "boolean"
		});

		Object.shimStatic(isEmpty);

		function isEmpty (object) {
			var ownProperties = [];
			
			if (Object.getOwnPropertyNames) {
				ownProperties = Object.getOwnPropertyNames(object);
			
			} else {
				ownProperties = Object.keys(object);
			}
			
			return 0 === ownProperties.length;
		}

		return isEmpty;
	}
);
