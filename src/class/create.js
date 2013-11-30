define(
	[
		"solv/meta",
		"solv/type",
		"solv/error/invalid-constructor-context",
		"solv/class/super",
		"solv/class/extend",
		"solv/class/mixin",
		"solv/function/overload",
		"solv/function/abstract"
	],
	function (meta, type, InvalidConstructorContext) {
		"use strict";

		meta({
			"type": "module",
			"export": "createClass",
			"description": "System for creating classes"
		});

		meta({
			"type": "function",
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
				name = getName();

			function Constructor () {
				
				if (notAnInstance(this)) {
					
					throw new InvalidConstructorContext({
						className: name
					});
				}
				
				if (hasInit) {
					init.apply(this, arguments);
				}
			}

			if (name) {
				injectClassName();
			}

			if (options["extends"]) {
				Constructor.extend(options["extends"]);
			}

			if (hasInit) {
				init = init.injectSuper(getSuperInit(Constructor));
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

			function notAnInstance(instance) {
				return (instance instanceof Constructor) === false;
			}

			function injectClassName () {
				/* jshint evil:true */
				
				// useful for inspecting constructor names, safe to remove
				Constructor = Constructor.toString().replace("Constructor", name);
				eval("Constructor = "+ Constructor +";");
			}

			return Constructor;
		}

		function getSuperInit (Constructor) {
			var Super = Constructor.Super,
				init = Super;
			
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

