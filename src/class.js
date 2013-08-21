define(
	[
		"./meta",
		"./type",
		"./extends",
		"./method",
		"./overload"
	],
	function (meta, type) {
		"use strict";

		meta({
			"entity": "module",
			"export": "Class",
			"description": "System for building classes"
		});

		meta({
			"entity": "function",
			"name": "Class",
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

		function Class (options) {
			var forcingNew = false;

			if (options.extends) {
				Constructor.extends(options.extends);
			}

			function shouldInvokeInit () {
				return !forcingNew && type.is("function", options.init);
			}

			return function Constructor () {
				var instance = this;

				if (notAnInstance(instance)) {
					forcingNew = true;
					instance = new Constructor();
					forcingNew = false;
				}

				if (options.name) {
					Constructor = Constructor.toString().replace(/Constructor/g, options.name);
					eval("Constructor = "+ Constructor +";");
				}

				if (shouldInvokeInit()) {
					options.init.apply(instance, arguments);
				}

				function notAnInstance(instance) {
					return (instance instanceof Constructor) === false;
				}

				return instance;
			};
		}

		Class = Class.overload("function?", ClassNoOptions);

		function ClassNoOptions (init) {
			return Class({
				init: init
			});
		}

		return Class;
	}
);
