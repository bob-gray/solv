/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../object/shim");
	require("../array/shim");
	require("../function/shim");

	var empties = {
		object: function () {
			return {};
		},
		array: function () {
			return [];
		}
	};

	function getEmpty (type) {
		var getter = empties[type],
			empty;

		if (getter) {
			empty = getter();
		}

		return empty;
	}

	function copy (assign, target, source) {
		var properties = ownNonNullProperties(source);

		return properties.reduce(assign.bind(source), target);
	}

	function ownNonNullProperties (source) {
		return Object.keys(source).filter(isDefined, source);
	}

	function isDefined (name) {
		/* jshint eqnull:true */
		return this[name] != null;
	}

	return {
		simple: /string|number|boolean|null/,
		complex: /object|array/,
		copy: copy,
		getEmpty: getEmpty
	};
});