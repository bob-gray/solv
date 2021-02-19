/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/shim");
	require("../array/shim");

	var meta = require("../meta");

	meta({
		"name": "Object",
		"type": "class",
		"global": true
	});

	meta({
		"name": "keys",
		"static": true,
		"shim": true,
		"description": "Returns an array of an object's own enumerable properties",
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
		"description": "Create a new object with given prototype",
		"arguments": [{
			"name": "proto",
			"type": "object"
		}],
		"returns": "object"
	});

	meta({
		"name": "setPrototypeOf",
		"static": true,
		"shim": true,
		"description": "Sets the prototype of an object to another object",
		"arguments": [{
			"name": "object",
			"type": "object"
		}, {
			"name": "proto",
			"type": "object"
		}],
		"returns": "object"
	});

	meta({
		"name": "assign",
		"static": true,
		"shim": true,
		"description": "Copies all enumerable own properties from one or more source objects to a target object",
		"arguments": [{
			"name": "target",
			"type": "object"
		}, {
			"name": "source",
			"type": "object",
			"repeating": "true"
		}],
		"returns": "object"
	});

	var shims = {};

	shims.keys = function (object) {
		throwIfNonObject(object);

		return getKeys(object);
	};

	shims.create = function (proto) {
		Surrogate.prototype = proto;

		return new Surrogate();
	};

	shims.setPrototypeOf = function (object, proto) {
		var result = object;

		throwIfNonObject(object);

		/* jshint -W103 */
		if (object.__proto__) {
			object.__proto__ = proto;
		} else {
			result = Object.assign(Object.create(proto), object);
		}

		return result;
	};

	shims.assign = function (target) {
		var sources = Array.from(arguments).slice(1);

		throwIfNonObject(target);

		sources.forEach(function (source) {
			Object.keys(source || {}).forEach(function (key) {
				target[key] = source[key];
			});
		});

		return target;
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
		var type = typeof value;

		return value === null || (type !== "object" && type !== "function");
	}

	Object.shimStatic("keys", shims.keys);
	Object.shimStatic("create", shims.create);
	Object.shimStatic("setPrototypeOf", shims.setPrototypeOf);
	Object.shimStatic("assign", shims.assign);

	return shims;
});