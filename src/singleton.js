define(
	[
		"./meta",
		"./class",
		"./base"
	],
	function (meta, Class, Base) {
		var Singleton = Class(function () {
			this.invoke("addInstance");
		});

		Singleton.extends(Base);

		function addInstance () {
			var constructor = this.constructor;
			if (!constructor.instances) {
				constructor.instances = [];
			}
			constructor.instances.unshift(this);
		}

		Singleton.method(meta({
			"entity": "method",
			"for": "Singleton",
			"name": "getInstance",
			"description": "Useful for getting the singleton instance from class constructor.",
			"implementation": function () {
				return this.instances && this.instances[0];
			}
		}));

		return Singleton;
	}
);