define(
	[
		"./meta",
		"./type",
	 	"./array"
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
			"types": "string, number, boolean, array, object, date, regexp, function, undefined, null or *",
			"examples": {
				"boolean?, string|number, function": "Matches (boolean, number, function) and (boolean, string, function) and (string,function) and (number,function). Does not match (boolean, function) or (boolean, number)",
				"string, object, any, !null*": "Matches (string, object, object) and (string, object, number, number) and (string, object, null). Does not match (string, object, object, null)."
			},
			"meta characters": [{
				"!": "Exclude a type. !string can be read 'not string'"
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
				"description": "A comma delimited list that describes the argument types to be passed to a function. Can include \"?*+|!\". See function signature."
			}],
			"return": {
				"type": "regexp",
				"description": "Can be used for testing against an arguments signature"
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
			"return": {
				"type": "string",
				"description": "Comma delimited list of types"
			}
		});

		var whiteSpace = /\s+/g,
			noneOneMany = /,?([^,]+)([?*+])/g,
			or = /((?:[^,?|()]+\|)+[^,?|()]+)/g,
			any = /\bany\b/g,
			not = /!([^,|]+)/g;

		Function.compileImplementationSignature = function (signature) {
			var regexSrc = createSignatureRegexSrc(signature);
			return new RegExp(regexSrc);
		};

		function createSignatureRegexSrc (signature) {
			return "^"+
				signature.replace(whiteSpace, "")
					.replace(noneOneMany, "(?:,?$1)$2")
					.replace(or, "(?:$1)")
					.replace(not, "\\b(?!$1)[^,]+")
					.replace(any, "[^,]+")
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
	}
);