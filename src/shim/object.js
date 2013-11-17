define(
	[
		"../meta",
		"../type",
		"../class/shim"
	],
	function (meta, type) {
		"use strict";

		meta({
			"description": "Augments Object class constructor"
		});

		meta({
			"name": "Object",
			"type": "class",
			"global": true
		});

		meta({
			"name": "keys",
			"static": true,
			"shim": true,
			"description": "Returns an array of an object's own enumerable properties.",
			"arguments": [{
				"name": "object",
				"type": "object"
			}],
			"returns": "array"
		});

		meta({
			"name": "create",
			"static": true,
			"shim": true,
			"description": "Create a new object with proto set as object's prototype",
			"arguments": [{
				"name": "proto",
				"type": "object"
			}],
			"returns": "object"
		});

		var shims = {};

		shims.keys = function(object) {
			throwIfNonObject(object);
			return getKeys(object);
		};

		shims.create = function (proto) {
			Surrogate.prototype = proto;
			return new Surrogate();
		};

		function Surrogate () {}

		function getKeys (object) {
			var keys = [],
				key;
			for (key in object) {
				if (object.hasOwnProperty(key)) {
					keys.push(key);
				}
			}
			return keys;
		}

		function throwIfNonObject (object) {
			if (isNonObject(object)) {
				throw new TypeError("Object.keys called on non-object");
			}
		}

		function isNonObject (value) {
			return type.is.not("object", value) && type.is.not("function", value);
		}

		Object.shimStatic("keys", shims.keys);
		Object.shimStatic("create", shims.create);

		return shims;
	}
);
