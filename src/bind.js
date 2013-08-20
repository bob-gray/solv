define(
	[
		"./meta",
		"./array",
		"./extends"
	],
	function (meta) {
		if (!Function.prototype.bind) {
			Function.prototype.bind = function (context) {
				var fn = this,
					args = Array.fromArguments(arguments).slice(1);

				function bound () {
					var newArgs = Array.fromArguments(arguments);
					args = args.concat(newArgs);
					if (this instanceof bound) {
						context = this;
					}
					return fn.apply(context, args);
				}

				bound.extends(fn);
			};
		}
	}
);