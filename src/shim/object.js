define(
	[
		"../meta"
	],
	function (meta) {
		if (!Object.keys) {
			Object.keys = function(object) {
				var keys = [];
				if (isValidObject(object)) {
					throw TypeError("Object.keys called on non-object");
				}
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						keys.push(key);
					}
				}
				return keys;
			}
		}

		function isValidObject (object) {
			var type = typeof object;
			return type != "object" && type != "function" || object == null;
		}
	}
);
