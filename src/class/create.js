if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("./super");
	require("./extend");
	require("./mixin");
	require("../function/overload");
	require("../function/abstract");
	require("../function/get-name");
	require("../function/default-args");
	require("../object/is-empty");
	
	var meta = require("../meta"),
		type = require("../type"),
		InvalidConstructorContext = require("../error/invalid-constructor-context"),
		getDefaults = require("./get-defaults");

	meta({
		"name": "createClass",
		"type": "function",
		"description": "Creates a new class",
		"arguments": [{
			"name": "options",
			"type": "object",
			"required": false,
			"description": "Class options.",
			"properties": {
				"name": "string",
				"extends": "function",
				"mixins": "array|object|function",
				"arguments": "array"
			}
		}, {
			"name": "init",
			"type": "function",
			"required": false,
			"description": "This function is called from within the constructor. Use it to initialize new instances. The value of this within init will be the new instance."
		}],
		"return": {
			"type": "function",
			"description": "Class constructor. Use this constructor for other class setup tasks such as creating methods and setting up inheritance."
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
			
		} else {
			init = null;
		}

		Constructor.init = init;

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
				propertiesArg,
				index = -1;
			
			if (type.is("array", argsMeta)) {
				propertiesArg = argsMeta.filter(isPropertiesArg)[0];
				index = argsMeta.indexOf(propertiesArg);
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
	
	function isPropertiesArg (arg) {
		return "properties" === arg.name && "object" === arg.type;
	}

	function getSuperInit (Constructor) {
		var Super = Constructor.Super,
			init = Super;
		
		while (Super) {

			if (type.is("function", Super.init)) {
				init = Super.init;
				break;
			
			} else if (type.is.not("null", Super.init)) {
				init = Super;
				break;
			}

			Super = Super.Super;
		}
		
		return init;
	}

	return createClass;
});