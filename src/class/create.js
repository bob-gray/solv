if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../function/overload");
	require("../function/abstract");
	
	var meta = require("../meta"),
		ClassMaker = require("./class-maker");

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
			.overload("function?", createWithoutOptions)
			.overload("object,function?", create);

	function createWithoutOptions (init) {
		return create({}, init);
	}

	function create (options, init) {
		var Class = new ClassMaker(Constructor, options, init);

		if (Class.hasName()) {
			injectClassName();
		}

		if (Class.hasSuperClass()) {
			Class.extendSuperClass();
		}

		if (Class.hasInit()) {
			Class.setSuperInit();
		}
		
		Constructor.init = Class.init;
		
		if (Class.hasMixins()) {
			Class.addMixins();
		}

		if (Class.hasDefaultArgs()) {
			Class.injectDefaultArgs();
		}

		function Constructor () {
			Class.validateContext(this);
			
			if (Class.hasDefaultProperties()) {
				Class.injectDefaultProperties(this);
			}
			
			if (Class.hasPropertiesArg()) {
				Class.injectPropertiesFromArgs(this, arguments);
			}
			
			if (Class.hasInit()) {
				Class.init.apply(this, arguments);
			}
		}

		function injectClassName () {
			/* jshint evil:true, -W021 */
			
			// useful for inspecting constructor names, safe to remove
			Constructor = Constructor.toString().replace("Constructor", Class.name);
			eval("Constructor = "+ Constructor +";");
			Class.Constructor = Constructor;
		}

		return Constructor;
	}

	return createClass;
});