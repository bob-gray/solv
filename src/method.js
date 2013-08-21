define(
	[
		"./meta",
		"./type",
		"./overload",
		"./array"
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
				existingIsFunction,
				signature = getSignature(options);

			if (options.static) {
				existing = constructor[options.name];
				existingIsFunction = type.is("function", existing);

				if (!existingIsFunction || options.override) {
					constructor[options.name] = options.implementation;
				} else {
					constructor[options.name] = existing.overload(options.signature, options.implementation);
				}

			} else if (options["default"]) {
				methods["@default: "+ options.name] = options.implementation;

			} else {
				existing = methods[options.name];
				existingIsFunction = type.is("function", existing);

				if (options.signature && (!existingIsFunction || options.override)) {
					existing = Function.Abstract(options.name);
					existingIsFunction = true;
				}

				if (existingIsFunction && !options.polyfill) {
					methods[options.name] = existing.overload(options.signature, options.implementation);
				} else if (!options.signature || options.polyfill) {
					methods[options.name] = options.implementation;
				}
			}

			return constructor;
		}

		function getSignature (options) {
			var signature = options.signature;
			if (!signature && options["arguments"]) {
				signature = options["arguments"].map(argToSignature).join(",");
			}
			return signature;
		}

		function argToSignature (arg) {
			var type = arg.type || "any";
			if (arg.repeating && arg.required) {
				type += "+";
			} else if (arg.repeating && !arg.required) {
				type += "*"
			} else if (!arg.required) {
				type += "?";
			}
			return type;
		}
	}
);