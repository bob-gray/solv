define(
	[
		"../meta",
		"../class",
		"./base"
	],
	function (meta, createClass, Base) {
		"use strict";

		meta.define("solv/abstract/base", Base);

		var Singleton = createClass(
			meta({
				"name": "Singleton",
				"extends": "solv/abstract/base"
			}),
			init
		);

		Singleton.method(
			meta({
				"name": "getInstance",
				"static": true,
				"description": "Useful for getting the singleton instance from class constructor.",
				"returns": {
					"type": "object",
					"description": "Single instance."
				}
			}),
			getInstance
		);

		function init () {
			this.invoke(addInstance);
			this.invoke(attachStaticGetInstance);
		}

		function addInstance () {
			var constructor = this.constructor;
			if (!constructor.instances) {
				constructor.instances = [];
			}
			constructor.instances.unshift(this);
		}

		function attachStaticGetInstance() {
			var constructor = this.constructor;
			if (!constructor.getInstance) {
				constructor.getInstance = getInstance;
			}
		}

		function getInstance () {
			return this.instances && this.instances[0];
		}

		return Singleton;
	}
);