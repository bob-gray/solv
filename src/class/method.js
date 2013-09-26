define(
	[
		"../meta",
		"../type",
		"../function/overload",
		"../function/abstract",
		"../function/get-name",
		"../function/validate-return-type"
	],
	function (meta, type) {
		"use strict";

		meta({
			"entity": "class",
			"name": "Function",
			"global": true
		});

		meta({
			"entity": "method",
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
			"entity": "method",
			"name": "method",
			"arguments": [{
				"name": "signature",
				"type": "string"
			}, {
				"name": "implementation",
				"type": "function"
			}],
			"returns": "function"
		});

		meta({
			"entity": "method",
			"name": "method",
			"arguments": [{
				"name": "options",
				"type": "object"
			}],
			"returns": "function"
		});

		meta({
			"entity": "object",
			"name": "options",
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
			}, {
				"name": "implementation",
				"type": "function",
				"description": "This an implementation of the method. It is executed when the method is invoked with a matching signature."
			}]
		});

		meta({
			"entity": "object",
			"name": "argument",
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
			"entity": "object",
			"name": "returns",
			"properties": [{
				"name": "type",
				"type": "string"
			}]
		});

		Function.prototype.method = new Function.Abstract("method")
		.overload("string, function", function (name, implementation) {
			var options = {
				name: name,
				implementation: implementation
			};
			return method.call(this, options);

		}).overload("object, function", function (options, implementation) {
			options.implementation = implementation;
			return method.call(this, options);

		}).overload("object", method);

		function method (options) {
			validateReturnType(options);
			attachMethod(this, options);
			return this;
		}

		function validateReturnType (options) {
			var returnType = getReturnType(options),
				failHandler;
			if (returnType) {
				failHandler = returnTypeFail(options.name);
				options.implementation = options.implementation.validateReturnType(returnType, failHandler);
			}
		}

		function attachMethod (constructor, options) {
			if (options.static) {
				attachStaticMethod(constructor, options);
			} else if (options.shim) {
				attachShimMethod(constructor, options);
			} else {
				attachInstanceMethod(constructor, options);
			}
		}

		function getReturnType (options) {
			var returns = options.returns,
				returnType;
			if (type.is("string", returns)) {
				returnType = returns;
			} else if (returns && type.is("string", returns.type)) {
				returnType = returns.type;
			}
			return returnType;
		}

		function returnTypeFail (method) {
			return function (returnType) {
				throw "Method "+ method +" return type was expected to be "+ returnType.expected +"; actual return type was "+ returnType.actual;
			};
		}

		function attachStaticMethod (constructor, options) {
			var existing = constructor[options.name],
				signature = getSignature(options),
				overload = type.is("function", existing);

			if (!overload || options.override) {
				constructor[options.name] = options.implementation;
			} else {
				constructor[options.name] = existing.overload(signature, options.implementation);
			}
		}

		function attachShimMethod (constructor, options) {
			var methods = constructor.prototype,
				existing = methods[options.name];
			if (!type.is("function", existing)) {
				methods[options.name] = options.implementation;
			}
		}

		function attachInstanceMethod (constructor, options) {
			var methods = constructor.prototype,
				overload = true,
				signature = getSignature(options),
				hasSignature = type.is("string", signature),
				existing = methods[options.name],
				implementationExists = type.is("function", existing),
				methodFullName = getMethodFullName(constructor, options.name);

			if (hasSignature && (!implementationExists || options.override)) {
				existing = new Function.Abstract(methodFullName);
			} else if (!hasSignature) {
				overload = false;
			}

			if (overload) {
				methods[options.name] = existing.overload(signature, options.implementation);
			} else {
				methods[options.name] = options.implementation;
			}
		}

		function getSignature (options) {
			var signature = options.signature;
			if (!type.is("string", signature)) {
				signature = Function.getSignatureFromArgumentsMeta(options["arguments"]);
			}
			return signature;
		}

		function getMethodFullName (constructor, name) {
			var fullName = "",
				className = constructor.getName();
			if (className) {
				fullName = className +".";
			}
			fullName += name;
			return fullName;
		}
	}
);