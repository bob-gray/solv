if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("./super");
	require("./extend");
	require("./mixin");
	require("../function/get-name");
	require("../function/default-args");
	require("../object/is-empty");

	var meta = require("../meta"),
		type = require("../type"),
		getDefaults = require("./get-defaults"),
		InvalidConstructorContext = require("../error/invalid-constructor-context");

	function ClassMaker (Constructor, options, init) {
		this.Constructor = Constructor;
		this.setInit(init);
		this.setName(options.name);
		this.argsMeta = options["arguments"] || [];
		this.propsMeta = options.properties || [];
		this.superClass = options["extends"];
		this.mixins = options.mixins;
		this.setDefaultArgs();
		this.setPropsArgIndex();
		this.setDefaultProperties();
	}

	ClassMaker.prototype.setInit = function (init) {
		if (type.is("function", init)) {
			this.init = init;

		} else {
			this.init = null;
		}
	};

	ClassMaker.prototype.setName = function (name) {
		if (name) {
			this.name = name;

		} else if (this.hasInit()) {
			this.name = this.init.getName();
		}
	};

	ClassMaker.prototype.setDefaultArgs = function () {
		this.defaultArgs = getDefaults(this.argsMeta);
	};

	ClassMaker.prototype.setPropsArgIndex = function () {
		this.propsArgIndex = this.argsMeta.reduce(findPropertiesArgIndex, -1);
	};

	ClassMaker.prototype.hasName = function () {
		return type.is("string", this.name);
	};

	ClassMaker.prototype.hasInit = function () {
		return null !== this.init;
	};

	ClassMaker.prototype.hasDefaultArgs = function () {
		return this.hasInit() && arrayNotEmpty(this.defaultArgs);
	};

	ClassMaker.prototype.hasSuperClass = function () {
		return type.is("function", this.superClass);
	};

	ClassMaker.prototype.extendSuperClass = function () {
		this.Constructor.extend(this.superClass);
	};

	ClassMaker.prototype.setSuperInit = function () {
		this.superInit = getSuperInit(this.Constructor);
		this.init = this.init.injectSuper(this.superInit);
	};

	ClassMaker.prototype.hasMixins = function () {
		return type.is.not("undefined", this.mixins);
	};

	ClassMaker.prototype.addMixins = function () {
		this.Constructor.mixin(this.mixins);
	};
	
	ClassMaker.prototype.hasPropertiesArg = function () {
		return isFound(this.propsArgIndex);
	};

	ClassMaker.prototype.setDefaultProperties = function () {
		this.defaultProps = getDefaults(this.propsMeta);
	};

	ClassMaker.prototype.hasDefaultProperties = function () {
		return objectNotEmpty(this.defaultProps);
	};

	ClassMaker.prototype.injectDefaultProperties = function (instance) {
		Object.merge.deep(instance, this.defaultProps);
	};

	ClassMaker.prototype.injectPropertiesFromArgs = function (instance, args) {
		var properties = this.getPropertiesFromArgs(args);

		Object.merge.deep(instance, properties);
	};

	ClassMaker.prototype.injectDefaultArgs = function () {
		this.init = this.init.defaultArgs.apply(this.init, this.defaultArgs);
	};

	ClassMaker.prototype.validateContext = function (context) {
		if (this.notAnInstance(context)) {
			throw new InvalidConstructorContext({
				className: this.name
			});
		}
	};

	ClassMaker.prototype.getPropertiesFromArgs = function (args) {
		return args[this.propsArgIndex] || {};
	};

	ClassMaker.prototype.notAnInstance = function (instance) {
		return (instance instanceof this.Constructor) === false;
	};

	function findPropertiesArgIndex (result, arg, index) {
		if (notFound(result) && isPropertiesArg(arg)) {
			result = index;
		}
		return result;
	}

	function notFound (result) {
		return !isFound(result);
	}

	function isFound (result) {
		return -1 !== result;
	}

	function objectNotEmpty (object) {
		var empty;
		
		if (!object) {
			empty = true;
		} else {
			empty = Object.isEmpty(object);
		}
		
		return !empty;
	}

	function arrayNotEmpty (array) {
		return array.length > 0;
	}

	function isPropertiesArg (arg) {
		return "properties" === arg.name && "object" === arg.type;
	}

	function getSuperInit (Constructor) {
		var Super = Constructor.Super,
			superInit = Super;
		
		while (Super) {
			if (type.is("function", Super.init)) {
				superInit = Super.init;
				break;
			
			} else if (type.is.not("null", Super.init)) {
				superInit = Super;
				break;
			}

			Super = Super.Super;
		}
		
		return superInit;
	}

	return ClassMaker;
});