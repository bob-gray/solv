/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../shim/object");
	require("../shim/array");
	require("../array/from");
	require("../class/shim");
	require("../function/curry");

	var meta = require("../meta"),
		type = require("../type"),
		utils = require("./utils");

	meta({
		"name": "Object",
		"type": "class",
		"global": true
	});

	meta({
		"name": "merge",
		"static": true,
		"shim": true,
		"description": "Copies own properties that are not null or undefined from source objects to a target object",
		"arguments": [{
			"name": "target",
			"type": "object"
		}, {
			"name": "source",
			"type": "object",
			"description": "Priority is least to greatest. Properties of target will be overwritten.",
			"repeating": "true"
		}],
		"returns": {
			"type": "object",
			"description": "target"
		}
	});

	meta({
		"name": "merge.deep",
		"static": true,
		"shim": true,
		"description": "Same as .merge but merge is recursive. Arrays are not combined.",
		"arguments": [{
			"name": "target",
			"type": "object"
		}, {
			"name": "source",
			"type": "object",
			"repeating": "true"
		}],
		"returns": {
			"type": "object",
			"description": "target"
		}
	});

	Object.shimStatic("merge", merge);
	
	var deep = false;

	merge.deep = function () {
		deep = true;
		var result = merge.apply(this, arguments);
		deep = false;
		
		return result;
	};

	function merge (target) {
		var sources = Array.from(arguments).slice(1),
			copy = utils.copy.curry(assign);

		return sources.reduce(copy, target);
	}

	function assign (target, name) {
		var value = this[name],
			targetValue = target[name],
			valueType = type.of(value);
		
		if (deep && utils.complex.test(valueType)) {
			
			if (type.is("array", value) || type.is.not("object", targetValue)) {
				targetValue = utils.getEmpty(valueType);
			}
			
			value = merge(targetValue, value);
		}
		
		target[name] = value;

		return target;
	}

	return merge;
});