define(
	[
		"solv/meta",
		"solv/type",
		"solv/error/invalid-constructor-context",
		"solv/class/defaults",
		"solv/class/super",
		"solv/class/extend",
		"solv/class/mixin",
		"solv/function/overload",
		"solv/function/abstract",
		"solv/object/is-empty"
	],
	function (meta, type, InvalidConstructorContext, defaults) {
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
				name = getName(),
				argsMeta = options["arguments"],
				defaultArgs = defaults.args(argsMeta),
				propertiesArgIndex = getPropertiesArgIndex(argsMeta),
				hasPropertiesArg = propertiesArgIndex > -1,
				defaultProperties = defaults.properties(options.properties),
				hasDefaultProperties = !Object.isEmpty(defaultProperties);

			function Constructor () {
				if (notAnInstance(this)) {
					
					throw new InvalidConstructorContext({
						className: name
					});
				}
				
				if (hasDefaultProperties) {
					Object.merge.deep(this, defaultProperties);
				}
				
				if (hasPropertiesArg) {
					Object.merge.deep(this, arguments[propertiesArgIndex] || {});
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

			if (options.mixins) {
				Constructor.mixin(options.mixins);
			}
			
			if (defaultArgs.length && hasInit) {
				init = init.defaultArgs.apply(init, defaultArgs);
			}

			if (hasInit) {
				init = init.injectSuper(getSuperInit(Constructor));
				Constructor.init = init;
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
			
			function getOptionsArgIndex (argsMeta) {
				var index = -1;
				
				if (type.is("array", argsMeta)) {
					index = argsMeta.reduce(findOptionsArgMeta, index);
				}
				
				return index;
			}
			
			function findOptionsArgMeta (index, arg, i, argsMeta) {
				if (index === -1 && "options" === arg.name && "object" === arg.type) {
					index = i;
				}
				
				return index;
			}
			
			function getPropertiesArgIndex (argsMeta) {
				var index = -1;
				
				if (type.is("array", argsMeta)) {
					index = argsMeta.reduce(findPropertiesArgMeta, index);
				}
				
				return index;
			}
			
			function findPropertiesArgMeta (index, arg, i, argsMeta) {
				if (index === -1 && "properties" === arg.name && "object" === arg.type) {
					index = i;
				}
				
				return index;
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

