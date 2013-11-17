define(
	[
		"../meta",
		"./method-maker"
	],
	function (meta, MethodMaker) {
		"use strict";

		meta({
			"name": "Function",
			"type": "class",
			"global": true
		});

		meta({
			"name": "method",
			"description": "To be called as a static method of a class constructor. Adds a new method to the class prototype. Methods are overloaded when more than one method of the same name is added. Inherited methods are also overloaded.",
			"arguments": [{
				"name": "options",
				"type": "object"
			}, {
				"name": "implementation",
				"type": "function"
			}],
			"returns": {
				"type": "function",
				"description": "The constructor (the method's owner). This allows chaining."
			}
		});

		meta({
			"name": "method",
			"arguments": [{
				"name": "name",
				"type": "string"
			}, {
				"name": "implementation",
				"type": "function"
			}],
			"returns": "function"
		});

		meta({
			"name": "options",
			"type": "object",
			"properties": [{
				"name": "name",
				"type": "string",
				"description": "Name of method"
			}, {
				"name": "static",
				"type": "boolean",
				"default": false,
				"description": "Attaches the method directly to the class constructor and not the prototype."
			}, {
				"name": "override",
				"type": "boolean",
				"default": false,
				"description": "Override existing implementation as opposed to overloading it."
			}, {
				"name": "shim",
				"type": "boolean",
				"default": "false",
				"description": "Only attaches the method if it doesn't already exist."
			}, {
				"name": "signature",
				"type": "string",
				"description": "A comma delimited list of argument types. Can include meta characters ?*+|!. If signature is not explicitly passed it is generated from the arguments option or the implementation's length property.",
				"required": false
			}, {
				"name": "arguments",
				"type": "array",
				"description": "Argument option objects"
			}, {
				"name": "returns",
				"type": "string|object",
				"description": "Type of return value"
			}]
		});

		meta({
			"name": "arguments",
			"type": "object",
			"properties": [{
				"name": "name",
				"type": "string"
			}, {
				"name": "type",
				"type": "string"
			}, {
				"name": "required",
				"type": "boolean",
				"default": true
			}, {
				"name": "repeating",
				"type": "boolean",
				"default": false
			}]
		});

		meta({
			"name": "returns",
			"type": "object",
			"properties": [{
				"name": "type",
				"type": "string"
			}]
		});

		var method = new Function.Abstract("method")
				.overload("string, function", methodWithName)
				.overload("object, function?", methodWithOptions);
		
		Function.shim("method", method);

		function methodWithName (name, implementation) {
			var options = {
				name: name
			};
			return methodWithOptions.call(this, options, implementation);
		}

		function methodWithOptions (options, implementation) {
			var Constructor = this,
				method = new MethodMaker(Constructor, options, implementation);
			if (method.needsSignature()) {
				method.setSignature();
			}
			if (method.hasReturnSignature()) {
				method.injectReturnTypeValidation();
			}
			if (method.isNonShimInstanceMethod()) {
				method.injectSuperHelpers();
			}
			method.attachMethod();
			return this;
		}
	}
);