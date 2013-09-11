define(
	[
		"../meta",
		"../type",
	 	"../shim/array"
	],
	function (meta, type) {
		"use strict";

		meta({
			"entity": "module",
			"description": "For getting invocation signatures from argument objects and compiling implementation signatures into regular expression that can used to test invocation signatures"
		});

		meta({
			"name": "Invocation Signature",
			"description": "Specification for defining the calling signature of a function.",
			"overview":	"Function signatures in this module are special comma delimited lists of signature components that describe the argument types expected by a function. The length of signature components doesn't necessarily match the length of a matching arguments collection because arguments can be specified as optional or repeating. Signatures are composed of one or more comma delimited components. Components are composed of one or more pipe delimited types each optional prefix with an exclamation point. Each component may optional be suffixed with a meta character indicating quantity. All white space is ignored and argument types are assumed to be lower case single word identifiers listed below.",
			"types": "string, number, boolean, array, object, date, regexp, function, undefined, null or any",
			"examples": {
				"boolean?, string|number, function": "Matches (boolean, number, function) and (boolean, string, function) and (string,function) and (number,function). Does not match (boolean, function) or (boolean, number)",
				"string, object, any, !(null|undefined)*": "Matches (string, object, object) and (string, object, number, number) and (string, object, null). Does not match (string, object, object, null)."
			},
			"meta characters": [{
				"!": "Exclude a type. !string can be read 'not string'"
			}, {
				"()": "Creates a group to be excluded. !(number|string) can be read 'not number or string'"
			}, {
				"|": "Any of a group of types (or exclusions). number|boolean can be read 'number or boolean'"
			}, {
				"?": "Zero or one of the preceding component. Makes a component optional"
			}, {
				"+": "One or more of the preceding component. Makes a component repeating"
			}, {
				"*": "Zero or more of the preceding component or a wild card if no preceding component. Make a component optional and repeating"
			}]
		});

		meta({
			"entity": "method",
			"for": "Function",
			"name": "compileImplementationSignature",
			"static": true,
			"description": "Transform a function signature into regular expression capable of testing argument signatures for a match.",
			"arguments": [{
				"name": "signature",
				"type": "string",
				"description": "A comma delimited list that describes the argument types to be passed to a function. Can include '?*+|!'. See function signature."
			}],
			"returns": {
				"type": "regexp",
				"description": "Can be used for testing against an arguments signature"
			}
		});

		meta({
			"entity": "method",
			"for": "Function",
			"name": "compileReturnSignature",
			"static": true,
			"description": "Transform a function return signature into regular expression capable of testing a function's return value type.",
			"arguments": [{
				"name": "signature",
				"type": "string",
				"description": "A pipe delimited list of possible return types. Can include '!'. See function signature."
			}],
			"returns": {
				"type": "regexp",
				"description": "Can be used for testing against the type of a function's return value"
			}
		});

		meta({
			"entity": "method",
			"for": "Function",
			"name": "getInvocationSignature",
			"static": true,
			"description": "Gets a list of the types of arguments used to invoke a function",
			"arguments": [{
				"name": "args",
				"type": "arguments",
				"description": "An arguments object from a function invocation.",
				"repeating": false
			}],
			"returns": {
				"type": "string",
				"description": "Comma delimited list of types"
			}
		});

		meta({
			"entity": "method",
			"for": "Function",
			"name": "getSignatureFromArgumentsMeta",
			"static": true,
			"description": "Translates an array of arguments meta data into a signature string",
			"arguments": [{
				"name": "argumentsMeta",
				"type": "array",
				"description": "An array of object describing the arguments accepted by a function.",
				"repeating": false
			}],
			"returns": {
				"type": "string",
				"description": "A function signature string"
			}
		});

		Function.compileImplementationSignature = function (signature) {
			var regexSrc = createImplementationSignatureSrc(signature);
			return new RegExp(regexSrc);
		};

		Function.compileReturnSignature = function (signature) {
			var regexSrc = createReturnSignatureSrc(signature);
			return new RegExp(regexSrc);
		};

		var whiteSpace = {
				matcher: /\s+/g,
				replacement: ""
			},
			noneOneMany = {
				matcher: /,?([^,]+)([?*+])/g,
				replacement: "(?:,?$1)$2"
			},
			or = {
				matcher: /((?:[^,?|()]+\|)+[^,?|()]+)/g,
				replacement: "(?:$1)"
			},
			not = {
				matcher: {
					group: /!\(\(\?:([^)]+)\)\)/g,
					single: /(?:[^?]|^)!([^,|]+)/g
				},
				replacement: "\\b(?!$1)[^,]+"
			},
			any = {
				matcher: /\bany\b/g,
				replacement: "[^,]+"
			};

		function createImplementationSignatureSrc (signature) {
			return "^"+
				signature.replace(whiteSpace.matcher, whiteSpace.replacement)
					.replace(noneOneMany.matcher, noneOneMany.replacement)
					.replace(or.matcher, or.replacement)
					.replace(not.matcher.group, not.replacement)
					.replace(not.matcher.single, not.replacement)
					.replace(any.matcher, any.replacement)
				+"$";
		}

		function createReturnSignatureSrc (signature) {
			return "^"+
				signature.replace(whiteSpace.matcher, whiteSpace.replacement)
					.replace(or.matcher, or.replacement)
					.replace(not.matcher.group, not.replacement)
					.replace(not.matcher.single, not.replacement)
					.replace(any.matcher, any.replacement)
				+"$";
		}

		Function.getInvocationSignature = function (args) {
			var argumentsArray = Array.fromArguments(args),
				argumentTypes = argumentsArray.map(getArgumentType),
				invocationSignature = argumentTypes.join(",");
			return invocationSignature;
		};

		function getArgumentType (argument) {
			return type.of(argument);
		}

		Function.getSignatureFromArgumentsMeta = function (argumentsMeta) {
			var signature;
			if (type.is("array", argumentsMeta)) {
				signature = argumentsMeta.map(argumentMetaToSignatureComponent).join(",");
			}
			return signature;
		};

		function argumentMetaToSignatureComponent (arg) {
			var type = arg.type || "any";
			if (arg.repeating && false !== arg.required) {
				type += "+";
			} else if (arg.repeating && false === arg.required) {
				type += "*"
			} else if (false === arg.required) {
				type += "?";
			}
			return type;
		}
	}
);