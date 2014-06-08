/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../shim/object");
	require("../shim/array");
	require("../shim/function");

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

	function getEmpty (type) {
		var empty;

		if ("object" === type) {
			empty = {};

		} else if ("array" === type) {
			empty = [];
		}

		return empty;
	}

	return {
		simple: /string|number|boolean|null/,
		complex: /object|array/,
		copy: copy,
		getEmpty: getEmpty
	};
});