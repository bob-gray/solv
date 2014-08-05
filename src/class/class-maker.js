/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("./method");
	require("./inject-super");
	require("./extend");
	require("./mixin");
	require("../function/get-name");
	require("../function/default-args");
	require("../object/is-empty");

	var meta = require("../meta"),
		type = require("../type"),
		getDefaults = require("./get-defaults"),
		InvalidConstructorContext = require("../error/invalid-constructor-context");

	function ClassMaker (options, init) {
		this.setInit(init);
		this.setName(options.name);
		this.setSuperClass(options["extends"]);
		this.setMixins(options.mixins);
		this.setMeta(options);
		this.setDefaultProperties();
		this.setDefaultArgs();
		this.setPropsArgIndex();
	}

	ClassMaker.method("setInit", function (init) {
		if (isFunction(init)) {
			this.init = init;

		} else {
			this.init = null;
		}
	});

	ClassMaker.method("setName", function (name) {
		if (name) {
			this.name = name;

		} else if (this.hasInit()) {
			this.name = this.init.getName();
		}
	});

	ClassMaker.method("setSuperClass", function (Super) {
		this.superClass = Super;
	});

	ClassMaker.method("setMixins", function (mixins) {
		this.mixins = mixins;
	});

	ClassMaker.method("setMeta", function (options) {
		var meta = {
			props: options.properties,
			args: options["arguments"]
		};

		if (notObject(meta.props)) {
			meta.props = {};
		}

		if (notArray(meta.args)) {
			meta.args = [];
		}

		this.meta = meta;
	});

	ClassMaker.method("setDefaultProperties", function () {
		this.defaultProps = getDefaults(this.meta.props);
	});

	ClassMaker.method("setDefaultArgs", function () {
		this.defaultArgs = getDefaults(this.meta.args);
	});

	ClassMaker.method("setPropsArgIndex", function () {
		this.propsArgIndex = this.meta.args.reduce(findPropertiesArgIndex, -1);
	});

	ClassMaker.method("setConstructor", function (Constructor) {
		this.Constructor = Constructor;
		Constructor.init = this.init;
		this.extendSuperClass();
		this.setSuperInit();
		this.injectMixins();
		this.injectDefaultArgs();
	});

	ClassMaker.method("validateContext", function (context) {
		if (this.notAnInstance(context)) {
			throw new InvalidConstructorContext({
				className: this.name
			});
		}
	});

	ClassMaker.method("injectDefaultProperties", function (instance) {
		if (this.hasDefaultProperties()) {
			Object.merge.deep(instance, this.defaultProps);
		}
	});

	ClassMaker.method("injectPropertiesFromArgs", function (instance, args) {
		var properties;

		if (this.hasPropertiesArg()) {
			properties = this.getPropertiesFromArgs(args);
			Object.merge.deep(instance, properties);	
		}
	});

	ClassMaker.method("hasInit", function () {
		return notNull(this.init);
	});

	ClassMaker.method("extendSuperClass", function () {
		if (this.hasSuperClass()) {
			this.Constructor.extend(this.superClass);
		}
	});

	ClassMaker.method("setSuperInit", function () {
		if (this.hasInit()) {
			this.superInit = getSuperInit(this.Constructor);
			this.init = this.init.injectSuper(this.superInit);
		}
	});

	ClassMaker.method("injectMixins", function () {
		if (this.hasMixins()) {
			this.Constructor.mixin(this.mixins);
		}
	});

	ClassMaker.method("injectDefaultArgs", function () {
		if (this.hasDefaultArgs()) {
			this.init = this.init.defaultArgs.apply(this.init, this.defaultArgs);
		}
	});

	ClassMaker.method("getPropertiesFromArgs", function (args) {
		var properties = args[this.propsArgIndex];

		if (notObject(properties)) {
			properties = {};
		}

		return  properties;
	});

	ClassMaker.method("hasName", function () {
		return type.is("string", this.name);
	});

	ClassMaker.method("hasDefaultArgs", function () {
		return this.hasInit() && notEmptyArray(this.defaultArgs);
	});

	ClassMaker.method("hasSuperClass", function () {
		return type.is("function", this.superClass);
	});

	ClassMaker.method("hasMixins", function () {
		return type.is.not("undefined", this.mixins);
	});
	
	ClassMaker.method("hasPropertiesArg", function () {
		return isFound(this.propsArgIndex);
	});

	ClassMaker.method("hasDefaultProperties", function () {
		return notEmptyObject(this.defaultProps);
	});

	ClassMaker.method("notAnInstance", function (instance) {
		return (instance instanceof this.Constructor) === false;
	});

	function notObject (value) {
		return type.is.not("object", value);
	}

	function notArray (value) {
		return type.is.not("array", value);
	}

	function notNull (value) {
		return type.is.not("null", value);
	}

	function isNull (value) {
		return type.is("null", value);
	}

	function isFunction (value) {
		return type.is("function", value);
	}

	function isNotFunction (value) {
		return type.is.not("function", value);
	}

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

	function notEmptyObject (object) {
		var empty;
		
		if (!object) {
			empty = true;
		} else {
			empty = Object.isEmpty(object);
		}
		
		return !empty;
	}

	function notEmptyArray (array) {
		return array.length > 0;
	}

	function isPropertiesArg (arg) {
		return "properties" === arg.name && "object" === arg.type;
	}

	function getSuperInit (Constructor) {
		var Super = Constructor.Super,
			superInit;

		if (Super) {
			superInit = getInit(Super);
		}
		
		return superInit;
	}

	function getInit (Super) {
		var init = Super.init;

		if (isNull(init)) {
			init = getSuperInit(Super);

		} else if (isNotFunction(init)) {
			init = Super;
		}

		return init;
	}

	return ClassMaker;
});