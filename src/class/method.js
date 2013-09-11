define(
	[
		"../meta",
		"../type",
		"../function/overload",
		"../shim/array"
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
			"owner": "Function",
			"name": "method",
			"description": "To be called as a static method of a class constructor. Adds a new method to the class prototype. Methods are overloaded when more than one method of the same name is added. Overloading also occurs for inherited methods. Overloading can be expensive and each new implementation adds overhead.",
			"arguments": [{
				"name": "name",
				"type": "string",
				"description": "Name of method"
			}, {
				"name": "directives",
				"type": "directives",
				"description": "Indicate how and where the method is added the class. See method directives",
				"required": false,
				"repeating": true
			}, {
				"name": "signature",
				"type": "string",
				"description": "A comma delimited list that describes the argument types to be passed to a function. Can include ?*+|!. See function signature. If signature is not passed and method is overloaded, the number of arguments accepted by the implementation will be used instead of the types of arguments.",
				"required": false
			}, {
				"name": "implementation",
				"type": "function",
				"description": "This an implementation of the method. It is executed when the method is invoked and the arguments match this implementation signature."
			}],
			"return": {
				"type": "function",
				"description": "The constructor (the method's owner). This allows chaining."
			}
		});

		Function.prototype.method = Function.Abstract("method")
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
			var constructor = this,
				methods = constructor.prototype,
				existing,
				overload,
				signature = getSignature(options),
				hasSignature = type.is("string", signature),
				returnType;

			if (type.is("string", options.returns)) {
				returnType = options.returns;
			} else if (options.returns && type.is("string", options.returns.type)) {
				returnType = options.returns.type;
			}

			if (returnType) {
				options.implementation = options.implementation.validateReturnType(returnType, returnTypeFail);
			}

			if (options.static) {
				existing = constructor[options.name];
				overload = type.is("function", existing);

				if (!overload || options.override) {
					constructor[options.name] = options.implementation;
				} else {
					constructor[options.name] = existing.overload(signature, options.implementation);
				}

			} else if (options["default"]) {
				methods["@default: "+ options.name] = options.implementation;

			} else {
				existing = methods[options.name];

				if (options.override) {
					overload = false;
				} else {
					overload = type.is("function", existing);
				}

				if (hasSignature && !overload) {
					existing = Function.Abstract(options.name);
					overload = true;
				} else if (overload && options.polyfill) {
					overload = false;
				}

				if (overload) {
					methods[options.name] = existing.overload(signature, options.implementation);
				} else if (!options.polyfill) {
					methods[options.name] = options.implementation;
				}
			}

			function returnTypeFail () {

			}

			return constructor;
		}

		function getSignature (options) {
			var signature = options.signature;
			if (!type.is("string", signature)) {
				signature = Function.getSignatureFromArgumentsMeta(options["arguments"]);
			}
			return signature;
		}
	}
);