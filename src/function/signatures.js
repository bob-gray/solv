if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../shim/array");
	require("../array/from");

	var meta = require("../meta"),
		type = require("../type");

	meta({
		"type": "module",
		"description": "Function invocation signatures, implementation signatures and return signatures"
	});

	meta({
		"name": "Function Implementation Signature",
		"type": "specification",
		"purpose": "Defining the expected calling signature of a function",
		"overview":	"Implementation signatures are special comma delimited lists of signature components that describe the argument types expected by a function. Components are composed of one or more pipe delimited types. Each component may optionally be prefixed with an exclamation point or suffixed with a meta character indicating quantity. White space is ignored. The number of signature components won't necessarily match the length of a matching arguments object because arguments can be specified as optional or repeating.",
		"types": "string, number, boolean, array, object, date, regexp, function, undefined, null or any",
		"examples": {
			"boolean?, string|number, function": "Matches (boolean, number, function) and (boolean, string, function) and (string,function) and (number,function). It does not match (boolean, function) or (boolean, number).",
			"string, object, any, !null|undefined*": "Matches (string, object, object) and (string, object, number, number) and (string, object, null). It does not match (string, object, object, null)."
		},
		"meta characters": [{
			"!": "Create a negating component. !string can be read 'not string'"
		}, {
			"|": "Or operator. number|boolean can be read 'number or boolean'"
		}, {
			"?": "Zero or one of the preceding component. Makes a component optional"
		}, {
			"+": "One or more of the preceding component. Makes a component repeating"
		}, {
			"*": "Zero or more of the preceding component. Make a component optional and repeating"
		}]
	});

	meta({
		"name": "compileImplementationSignature",
		"type": "function",
		"description": "Transform a function signature into regular expression capable of testing invocation signatures for a match",
		"arguments": [{
			"name": "signature",
			"type": "string",
			"description": "A comma delimited list of argument types and optional meta characters"
		}],
		"returns": "regexp"
	});

	meta({
		"name": "compileReturnSignature",
		"type": "function",
		"description": "Transform a function return signature into regular expression capable of testing a function's return value type.",
		"arguments": [{
			"name": "signature",
			"type": "string",
			"description": "A pipe delimited list of possible return types. Can be prefixed with ! to negate types"
		}],
		"returns": "regexp"
	});

	meta({
		"name": "getInvocationSignature",
		"type": "function",
		"description": "Gets a list of the types of arguments used to invoke a function",
		"arguments": [{
			"name": "args",
			"type": "arguments|array",
			"description": "An arguments object from within a function"
		}],
		"returns": {
			"type": "string",
			"description": "Comma delimited list of types"
		}
	});

	meta({
		"name": "getSignatureFromMeta",
		"type": "function",
		"description": "Translates an array of argument meta data into a signature string",
		"arguments": [{
			"name": "argumentsMeta",
			"type": "array",
			"description": "Describe the arguments accepted by a function",
			"items": "object"
		}],
		"returns": {
			"type": "string",
			"description": "A function implementation signature"
		}
	});

	var component = /(?:^|,)([^?+*,]+)([?+*])?/g,
		metaCharacters = /[-[\]{}()\\^$]/g,
		whitespace = /\s+/g,
		lineBegin = "^",
		lineEnd = "$",
		commaOrLineBegin = "(?:^|,)",
		any = "[^,]+",
		noCommaNext = "(?!,)",
		oneOrMore = "+",
		noneOrMore = "*",
		oneOrNone = "?",
		signatures = {};

	signatures.compileImplementationSignature = function (signature) {
		var regexSrc = createImplementationSignatureSrc(signature);

		return new RegExp(regexSrc);
	};

	signatures.compileReturnSignature = function (signature) {
		var regexSrc = createReturnSignatureSrc(signature);

		return new RegExp(regexSrc);
	};

	signatures.getInvocationSignature = function (args) {
		var argumentsArray = Array.from(args),
			argumentTypes = argumentsArray.map(getArgumentType);

		return argumentTypes.join(",");
	};

	signatures.getObjectSignature = function (object) {
		var keys = Object.keys(object).sort(),
			propertyTypes = keys.map(getPropertyTypes, object);

		return propertyTypes.join(",");
	};

	signatures.getSignatureFromMeta = function (meta) {
		var signature;

		if (isArray(meta)) {
			signature = meta.map(metaItemToSignatureComponent).join(",");

		} else if (isObject(meta)) {
			signature = metaObjectToSignature(meta);
		}

		return signature;
	};

	function metaObjectToSignature (meta) {
		var keys = Object.keys(meta).sort();
		
		return keys.map(metaObjectItemToSignatureComponent, meta).join(",");
	}

	function metaObjectItemToSignatureComponent (name) {
		var meta = this,
			item = meta[name];

		if (notObject(item)) {
			item = {
				type: item
			};
		}

		return name +":"+ metaItemToSignatureComponent(item);
	}

	function createImplementationSignatureSrc (signature) {
		signature = stripWhitespace(signature);

		if (signature) {
			signature = escapeMetaCharacters(signature);
			signature = signature.replace(component, processComponent);

		} else {
			signature = lineBegin;
		}

		return noCommaNext + signature + lineEnd;
	}

	function createReturnSignatureSrc (signature) {
		signature = stripWhitespace(signature);
		signature = escapeMetaCharacters(signature);
		signature = processTypes(signature);

		return lineBegin + signature + lineEnd;
	}

	function getPropertyTypes (key) {
		var object = this,
			propertyType = getArgumentType(object[key]);

		return key +":"+ propertyType;
	}

	function getArgumentType (argument) {
		return type.of(argument);
	}

	function isArray (value) {
		return type.is("array", value);
	}

	function isObject (value) {
		return type.is("object", value);
	}

	function notObject (value) {
		return type.is.not("object", value);
	}

	function metaItemToSignatureComponent (item) {
		var component = item.type || "any";

		if (isDefined(item["default"])) {
			item.required = false;
			component += "|null|undefined";
		}

		return component + getOccurenceSuffix(item);
	}

	function stripWhitespace (signature) {
		return signature.replace(whitespace, "");
	}

	function escapeMetaCharacters (signature) {
		return signature.replace(metaCharacters, "\\$&");
	}

	function processComponent (match, types, occurences) {
		var replacement = commaOrLineBegin + processTypes(types);

		if (occurences) {
			replacement = group(replacement) + occurences;
		}

		return replacement;
	}

	function processTypes (types) {
		if (isAny(types)) {
			types = any;

		} else if (isNot(types)) {
			types = not(types);

		} else if (isOr(types)) {
			types = group(types);
		}

		return types;
	}

	function isDefined (value) {
		return type.is.not("undefined", value);
	}

	function getOccurenceSuffix (arg) {
		var suffix = "";
		
		if (isOneOrMore(arg)) {
			suffix = oneOrMore;

		} else if (isNoneOrMore(arg)) {
			suffix = noneOrMore;

		} else if (isOneOrNone(arg)) {
			suffix = oneOrNone;
		}
		
		return suffix;
	}

	function isOneOrMore (arg) {
		return arg.repeating && false !== arg.required;
	}

	function isNoneOrMore (arg) {
		return arg.repeating && false === arg.required;
	}

	function isOneOrNone (arg) {
		return !arg.repeating && false === arg.required;
	}

	function isAny (types) {
		return "any" === types;
	}

	function isNot (types) {
		return "!" === types.charAt(0);
	}

	function isOr (types) {
		return types.indexOf("|") > -1;
	}

	function not (types) {
		return "(?"+ types +")[^,]+";
	}

	function group (value) {
		return "(?:"+ value +")";
	}
	
	return signatures;
});