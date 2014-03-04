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
			"description": "Class options",
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
			"description": "This function is called from within the constructor. Use init to initialize new instances. The value of 'this' within init will be the new instance."
		}],
		"return": {
			"type": "function",
			"description": "Class constructor. Use constructor for other class setup tasks such as creating methods and setting up inheritance. Invoke this constructor with the new operator to create class instances."
		}
	});
	
	var createClass = new Function.Abstract("createClass")
			.overload("function?", createWithoutOptions)
			.overload("object,function?", create);

	function createWithoutOptions (init) {
		var options = {};

		return create(options, init);
	}

	function create (options, init) {
		var Class = new ClassMaker(options, init),
			Constructor = constructorFactory(Class);

		Class.setConstructor(Constructor);

		return Constructor;
	}

	function constructorFactory (Class) {
		function Constructor () {
			Class.validateContext(this);
			Class.injectDefaultProperties(this);
			Class.injectPropertiesFromArgs(this, arguments);
			
			if (Class.hasInit()) {
				Class.init.apply(this, arguments);
			}
		}

		if (Class.hasName()) {
			injectClassName();
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