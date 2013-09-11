define(
	[
		"../meta",
		"../class",
		"./base"
	],
	function (meta, Class) {

		var Singleton = Class(
			meta({
				"name": "Singleton",
				"extends":  "solv/abstract/base"
			}),
			constructor
		);

		Singleton.method(
			meta({
				"entity": "method",
				"for": "Singleton",
				"static": true,
				"name": "getInstance",
				"description": "Useful for getting the singleton instance from class constructor.",
				"returns": {
					"type": "object",
					"description": "Single instance."
				}
			}),
			getInstance
		);

		function constructor () {
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