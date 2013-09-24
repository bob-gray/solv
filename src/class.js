/*jshint evil:true, -W021 */

define(
	[
		"./meta",
		"./type",
		"./class/extend",
		"./class/method",
		"./class/mixin",
		"./function/overload",
		"./shim/object",
		"./shim/array"
	],
	function (meta, type) {
		"use strict";

		meta({
			"entity": "module",
			"export": "createClass",
			"description": "System for building classes"
		});

		meta({
			"entity": "function",
			"name": "createClass",
			"description": "Creates a new class",
			"arguments": [{
				"name": "init",
				"type": "function",
				"description": "This function is called from within the constructor. Use it to initialize new instances. The value of this within init will be the new instance.",
				"required": false
			}],
			"return": {
				"type": "function",
				"description": "Class constructor. Use this constructor other class setup tasks such as creating methods and setting up inheritance. Instance are created when is function is invoked with or without the new operator."
			}
		});

		meta({
			"arguments": [{
				"name": "options",
				"type": "object",
				"description": "Class options.",
				"required": false
			}],
			"return": {
				"type": "function",
				"description": "Class constructor. Use this constructor other class setup tasks such as creating methods and setting up inheritance. Instance are created when is function is invoked with or without the new operator."
			}
		});

		function createClass (options, init) {
			var forcingNew = false,
				hasInit = type.is("function", init),
				name = options.name;

			if (!name && hasInit && init.name) {
				name = init.name;
			}

			function Constructor () {
				var instance = this;
				if (notAnInstance(instance)) {
					forcingNew = true;
					instance = new Constructor();
					forcingNew = false;
				}
				if (shouldInvokeInit()) {
					init.apply(instance, arguments);
				}
				return instance;
			}

			function shouldInvokeInit () {
				return !forcingNew && hasInit;
			}

			function notAnInstance(instance) {
				return (instance instanceof Constructor) === false;
			}

			// evil: only useful for inspecting constructor names in development - safe to remove
			if (name) {
				Constructor = Constructor.toString().replace(/Constructor/g, name);
				eval("Constructor = "+ Constructor +";");
			}

			if (options.extends) {
				Constructor.extend(options.extends);
			}

			if (options.mixins) {
				Constructor.mixin(options.mixins);
			}

			return Constructor;
		}

		// W021: jshint
		createClass = createClass.overload("function?", createClassNoOptions);

		function createClassNoOptions (init) {
			return createClass({}, init);
		}

		return createClass;
	}
);
