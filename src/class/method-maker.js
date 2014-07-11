/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("./super");
	require("../function/overload");
	require("../function/abstract");
	require("../function/get-name");
	require("../function/validate-return-type");
	require("../function/default-args");
	require("../object/merge");

	var meta = require("../meta"),
		type = require("../type"),
		signatures = require("../function/signatures"),
		getDefaults = require("./get-defaults");

	function MethodMaker (Constructor, options, implementation) {
		this.classConstructor = Constructor;
		Object.merge(this, options);
		this.setImplementation(implementation);
		this.setClassPrefix();
		this.setFullName();
		this.setTarget();
		this.setExisting();
		this.setDefaultArgs();
		this.setReturnSignature();
	}

	MethodMaker.prototype.setClassPrefix = function () {
		var className = this.classConstructor.getName();
		
		this.classPrefix = "";
		
		if (className) {
			this.classPrefix = className +".";
		}
	};

	MethodMaker.prototype.setFullName = function () {
		this.fullName = this.classPrefix + this.name;
	};

	MethodMaker.prototype.setImplementation = function (implementation) {
		
		if (implementation) {
			this.implementation = implementation;
		
		} else {
			this.implementation = this.createAbstractImplementation();
			this.abstract = true;
		}
	};

	MethodMaker.prototype.setTarget = function () {
		
		if (this.static) {
			this.target = this.classConstructor;
		
		} else {
			this.target = this.classConstructor.prototype;
		}
	};

	MethodMaker.prototype.setExisting = function () {
		this.existing = this.target[this.name];
	};

	MethodMaker.prototype.setDefaultArgs = function () {
		if (this["arguments"]) {
			this.defaultArgs = getDefaults(this["arguments"]);
		}
	};

	MethodMaker.prototype.setReturnSignature = function () {
		var returns = this.returns;
		
		if (type.is("string", returns)) {
			this.returnSignature = returns;
		
		} else if (returns && type.is("string", returns.type)) {
			this.returnSignature = returns.type;
		}
	};

	MethodMaker.prototype.hasDefaultArgs = function () {
		return this.defaultArgs && this.defaultArgs.length;
	};

	MethodMaker.prototype.injectDefaultArgs = function () {
		this.implementation = this.implementation.defaultArgs.apply(this.implementation, this.defaultArgs);
	};

	MethodMaker.prototype.needsSignature = function () {
		var signatureType = type.of(this.signature);

		return "string" !== signatureType && "number" !== signatureType;
	};

	MethodMaker.prototype.setSignature = function () {

		if (this.hasArgumentsMeta()) {
			this.setSignatureFromArgsMeta();

		} else if (!this.abstract) {
			this.signature = this.implementation.length;
		}
	};

	MethodMaker.prototype.hasArgumentsMeta = function () {
		return type.is("array", this["arguments"]);
	};

	MethodMaker.prototype.setSignatureFromArgsMeta = function () {

		if (this["arguments"].length) {
			this.signature = signatures.getSignatureFromMeta(this["arguments"]);

		} else {
			this.signature = 0;
		}
	};

	MethodMaker.prototype.hasReturnSignature = function () {
		return type.is("string", this.returnSignature);
	};

	MethodMaker.prototype.injectReturnTypeValidation = function () {

		if (!this.abstract) {
			this.implementation = this.implementation.validateReturnType({
				functionName: this.fullName,
				signature: this.returnSignature
			});
		}
	};

	MethodMaker.prototype.isNonShimInstanceMethod = function () {
		return !this.static && !this.shim;
	};

	MethodMaker.prototype.injectSuperHelpers = function () {

		if (!this.abstract) {
			this.implementation = this.implementation.injectSuper(this.existing);
		}
	};

	MethodMaker.prototype.attachMethod = function () {

		if (this.shim) {
			this.attachShimMethod();

		} else if (this.override || this.abstract) {
			this.directlyAttachMethod();

		} else {
			this.overloadMethod();
		}
	};

	MethodMaker.prototype.attachShimMethod = function () {

		if (this.noExistingImplementation()) {
			this.directlyAttachMethod();
		}
	};

	MethodMaker.prototype.directlyAttachMethod = function () {
		this.target[this.name] = this.implementation;
	};

	MethodMaker.prototype.overloadMethod = function () {

		if (this.noExistingImplementation()) {
			this.existing = this.createAbstractImplementation();
		}

		this.target[this.name] = this.existing.overload(this.signature, this.implementation);
	};

	MethodMaker.prototype.noExistingImplementation = function () {
		return !type.is("function", this.existing);
	};

	MethodMaker.prototype.createAbstractImplementation = function () {
		return new Function.Abstract(this.fullName);
	};

	return MethodMaker;
});