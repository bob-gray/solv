define(
	[
		"./meta",
		"./type"
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
			"name": "CreateClass",
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

		function Class (init) {
			var forcingNew = false;

			function shouldInvokeInit () {
				return !forcingNew && type.is("function", init);
			}

			return function Constructor () {
				var instance = this;

				if (notAnInstance(instance)) {
					forcingNew = true;
					instance = new Constructor();
					forcingNew = false;
				}

				if (shouldInvokeInit()) {
					init.apply(instance, arguments);
				}

				function notAnInstance(instance) {
					return (instance instanceof Constructor) === false;
				}

				return instance;
			};
		}

		return Class;
	}
);
