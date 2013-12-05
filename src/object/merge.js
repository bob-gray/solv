define(
	[
		"../meta",
		"../type",
		"../shim/object",
		"../shim/array",
		"../array/from",
		"../class/shim"
	],
	function (meta, type) {
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
		
		var deep = false;

		merge.deep = function () {
			deep = true;
			var result = merge.apply(this, arguments);
			deep = false;
			
			return result;
		};

		function merge (target) {
			var sources = Array.from(arguments).slice(1);
			return sources.reduce(copy, target);
		}

		function copy (target, source) {
			var properties = ownNonNullProperties(source);
			return properties.reduce(assign.bind(source), target);
		}

		function ownNonNullProperties (source) {
			return Object.keys(source).filter(isDefined, source);
		}

		function assign (target, name) {
			var value = this[name],
				targetValue = target[name];
			
			if (deep && type.is("object", value)) {
				
				if (type.is.not("object", targetValue)) {
					targetValue = {};
				}
				
				value = merge(targetValue, value);
			}
			
			target[name] = value;

			return target;
		}

		function isDefined (name) {
			/* jshint eqnull:true */
			return this[name] != null;
		}

		return merge;
	}
);
