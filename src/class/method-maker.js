define(
	[
		"../meta",
		"../type",
		"./super",
		"../function/overload",
		"../function/abstract",
		"../function/get-name",
		"../function/validate-return-type"
	],
	function (meta, type, injectSuper) {
		"use strict";

		function MethodMaker (constructor, options, implementation) {
			this.classConstructor = constructor;
			this.implementation = implementation;
			this.setOptions(options);
			this.init();
		}

		MethodMaker.prototype.setOptions = function (options) {
			this.name = options.name;
			this.static = options.static;
			this.override = options.override;
			this.shim = options.shim;
			this.signature = options.signature;
			this.argsMeta = options["arguments"];
			this.returns = options.returns;
		};

		MethodMaker.prototype.init = function () {
			this.setClassPrefix();
			this.setFullName();
			this.setSignature();
			this.setTarget();
			this.setExisting();
			this.setReturnSignature();
		};

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

		MethodMaker.prototype.setSignature = function () {
			if (this.needsSignature()) {
				if (this.hasArgumentsMeta()) {
					this.signature = Function.getSignatureFromArgumentsMeta(this.argsMeta);
				} else {
					this.signature = this.implementation.length;
				}
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

		MethodMaker.prototype.setReturnSignature = function () {
			var returns = this.returns;
			if (type.is("string", returns)) {
				this.returnSignature = returns;
			} else if (returns && type.is("string", returns.type)) {
				this.returnSignature = returns.type;
			}
		};

		MethodMaker.prototype.needsSignature = function () {
			var signatureType = type.of(this.signature);
			return "string" !== signatureType && "number" !== signatureType;
		};

		MethodMaker.prototype.hasArgumentsMeta = function () {
			return type.is("array", this.argsMeta);
		};

		MethodMaker.prototype.noExistingImplementation = function () {
			return type.is("function", this.existing);
		};

		MethodMaker.prototype.hasReturnSignature = function () {
			return type.is("string", this.returnSignature);
		};

		MethodMaker.prototype.injectReturnTypeValidation = function () {
			this.implementation = this.implementation.validateReturnType({
				functionName: this.fullName,
				signature: this.returnSignature
			});
		};

		MethodMaker.prototype.injectSuper = function () {
			if (this.isNonShimInstanceMethod()) {
				this.implementation = injectSuper(this.implementation, this.existing);
			}
		};

		MethodMaker.prototype.isNonShimInstanceMethod = function () {
			return !this.static && !this.shim;
		};

		MethodMaker.prototype.attachMethod = function () {
			if (this.shim) {
				this.attachShimMethod();
			} else if (this.override) {
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
				this.existing = new Function.Abstract(this.fullName);
			}
			this.target[this.name] = this.existing.overload(this.signature, this.implementation);
		};
	}
);