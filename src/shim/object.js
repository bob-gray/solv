define(
	[
		"../meta",
		"../type"
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
			"description": "Returns an array of an object's own enumerable properties.",
			"arguments": [{
				"name": "object",
				"type": "object"
			}],
			"returns": "array"
		});

		var objectStaticShims = {};

		objectStaticShims.keys = function(object) {
			throwIfNonObject(object);
			return getKeys(object);
		};

		objectStaticShims.create = function (proto) {
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

		function isNonObject (object) {
			var type = type.of(object);
			return "object" !== type  && "function" !== type;
		}

		if (!Object.keys) {
			Object.keys = objectStaticShims.keys;
		}

		if (!Object.create) {
			Object.create = objectStaticShims.create;
		}

		return objectStaticShims;
	}
);
