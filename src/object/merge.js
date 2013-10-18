define(
	[
		"../meta",
		"../shim/object",
		"../shim/array"
	],
	function (meta) {
		"use strict";

		meta({
			"type": "module",
			"description": "Utility for merging objects together"
		});

		meta({
			"name": "Object",
			"type": "class",
			"global": true
		});

		meta({
			"name": "merge",
			"static": true,
			"description": "Copies values that are not null and not undefined from source objects to a target object.",
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
				"description": "target object"
			}
		});

		function merge (target) {
			var sources = Array.from(arguments).slice(1);
			return sources.reduce(copy, target);
		}

		function copy (target, source) {
			var properties = ownNonNullProperties(source);
			return properties.reduce(assign.bind(source), target);
		}

		function ownNonNullProperties (source) {
			return Object.keys(source).filter(defined, source);
		}

		function assign (target, name) {
			target[name] = this[name];
			return target;
		}

		function defined (name) {
			/* jshint eqnull:true */
			return this[name] != null;
		}

		if (!Object.merge) {
			Object.merge = merge;
		}
	}
);
