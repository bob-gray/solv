define(
	[
		"../meta",
		"../shim/array"
	],
	function (meta) {
		meta({
			"name": "Function",
			"type": "class",
			"global": true
		});
		
		meta({
			"name": "constrict",
			"description": "Returns a proxy function that will only pass up to the max number of arguments to function",
			"arguments": [{
				"name": "max",
				"type": "number",
				"description": "Inclusive maxium number of arguments"
			}],
			"returns": "function"
		});
		
		Function.prototype.constrict = function (max) {
			var fn = this;
			return function () {
				var constricted = Array.from(arguments).slice(0, max);
				return fn.apply(this, constricted);
			};
		};
	}	
);