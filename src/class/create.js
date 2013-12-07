define(
	[
		"solv/meta",
		"solv/type",
		"solv/error/invalid-constructor-context",
		"solv/class/get-defaults",
		"solv/class/super",
		"solv/class/extend",
		"solv/class/mixin",
		"solv/function/overload",
		"solv/function/abstract",
		"solv/object/is-empty",
		"solv/function/get-name"
	],
	function (meta, type, InvalidConstructorContext, getDefaults) {
		"use strict";

		meta({
			"type": "module",
			"export": "createClass",
			"description": "System for creating classes"
		});

		meta({
			"name": "createClass",
			"type": "function",
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
			var name = getName(),
				defaultArgs = getDefaults(options["arguments"]),
				propertiesArgIndex = getPropertiesArgIndex(),
				defaultProperties = getDefaults(options.properties);

			function Constructor () {
				
				if (notAnInstance(this)) {
					throw new InvalidConstructorContext({
						className: name
					});
				}
				
				if (hasDefaultProperties()) {
					Object.merge.deep(this, defaultProperties);
				}
				
				if (hasPropertiesArg()) {
					Object.merge.deep(this, arguments[propertiesArgIndex] || {});
				}
				
				if (hasInit()) {
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
			
			if (hasDefaultArgs()) {
				init = init.defaultArgs.apply(init, defaultArgs);
			}

			if (hasInit()) {
				init = init.injectSuper(getSuperInit(Constructor));
				Constructor.init = init;
			}

			function getName () {
				var name;
				
				if (options.name) {
					name = options.name;
				
				} else if (hasInit()) {
					name = init.getName();
				}
				
				return name;
			}
			
			function getPropertiesArgIndex () {
				var argsMeta = options["arguments"],
					index = -1;
				
				if (type.is("array", argsMeta)) {
					index = argsMeta.reduce(toPropertiesArgIndex, index);
				}
				
				return index;
			}

			function notAnInstance(instance) {
				return (instance instanceof Constructor) === false;
			}
			
			function hasDefaultProperties () {
				return defaultProperties && !Object.isEmpty(defaultProperties);
			}
			
			function hasPropertiesArg () {
				return propertiesArgIndex > -1;
			}
			
			function hasInit () {
				return type.is("function", init);
			}

			function injectClassName () {
				/* jshint evil:true */
				
				// useful for inspecting constructor names, safe to remove
				Constructor = Constructor.toString().replace("Constructor", name);
				eval("Constructor = "+ Constructor +";");
			}
			
			function hasDefaultArgs () {
				return hasInit() && defaultArgs && defaultArgs.length;
			}

			return Constructor;
		}
			
		function toPropertiesArgIndex (index, arg, i, argsMeta) {
			
			if (index === -1 && "properties" === arg.name && "object" === arg.type) {
				index = i;
			}
			
			return index;
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

