define(
	[
		"solv/meta",
		"solv/shim/object",
		"solv/shim/array",
		"solv/array/from",
		"solv/class/shim"
	],
	function (meta) {
		"use strict";

		meta({
			"type": "module",
			"exports": "merge",
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

		Object.shimStatic(merge);

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

		return merge;
	}
);
