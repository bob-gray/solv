define(
	[
		"../meta",
		"../type",
		"./super",
		"./extend",
		"./mixin",
		"../function/overload",
		"../function/abstract"
	],
	function (meta, type, injectSuper) {
		"use strict";

		meta({
			"entity": "module",
			"export": "createClass",
			"description": "System for creating classes"
		});

		meta({
			"entity": "function",
			"name": "createClass",
			"description": "Creates a new class",
			"arguments": [{
				"name": "options",
				"type": "object",
				"description": "Class options.",
				"required": false
			}, {
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

		var createClass = new Function.Abstract("createClass")
			.overload("function?", createNoOptions)
			.overload("object,function?", create);

		function createNoOptions (init) {
			return create({}, init);
		}

		function create (options, init) {
			var hasInit = type.is("function", init),
				name = getName(),
				forcingNew = false,

				Constructor = function Constructor () {
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
				};

			if (name) {
				injectClassName();
			}

			if (options["extends"]) {
				Constructor.extend(options["extends"]);
			}

			if (hasInit) {
				init = injectSuper(init, getSuperInit(Constructor));
				Constructor.init = init;
			}

			if (options.mixins) {
				Constructor.mixin(options.mixins);
			}

			function getName () {
				var name;
				if (options.name) {
					name = options.name;
				} else if (hasInit && init.name) {
					name = init.name;
				}
				return name;
			}

			function shouldInvokeInit () {
				return !forcingNew && hasInit;
			}

			function notAnInstance(instance) {
				return (instance instanceof Constructor) === false;
			}

			function injectClassName () {
				/* jshint evil:true */
				// useful for inspecting constructor names, safe to remove
				Constructor = Constructor.toString().replace(/Constructor/g, name);
				eval("Constructor = "+ Constructor +";");
			}

			return Constructor;
		}

		function getSuperInit (Constructor) {
			var init,
				Super = Constructor.Super;
			while (Super) {
				if (Super.init) {
					init = Super.init;
					break;
				}
				Super = Super.Super;
			}
			return init;
		}

		return createClass;
	}
);

