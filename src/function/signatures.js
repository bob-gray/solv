/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../array/shim");
	require("../array/from");

	var type = require("../type"),
		component = /(?:^|,)([^?+*,]+)([?+*])?/g,
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