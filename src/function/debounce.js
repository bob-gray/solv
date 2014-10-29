/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta");

	/*meta({
		"name": "Function",
		"type": "class",
		"global": true
	});*/
	
	Function.method(
		meta({
			"name": "debounce",
			"description": "Higher-order function that returns a proxy that postpones execution until a lapse of n milliseconds",
			"arguments": [{
				"name": "lapse",
				"type": "number",
				"required": true
			}, {
				"name": "leading",
				"type": "boolean",
				"description": "If true executes on the leading edge of lapse. Otherwise on the trailing end.",
				"default": false
			}],
			"returns": "function"
		}),
		debounce
	);
	
	function debounce (lapse, leading) {
		var fn = this,
			due,
			debouncing,
			execute;
		
		return function () {
			due = !debouncing && leading;
			execute = proxy(fn, this, arguments);
			clearTimeout(debouncing);
			debouncing = setTimeout(tail, lapse);

			if (due) {
				execute();
			}
		};

		function tail () {
			debouncing = null;

			if (!leading) {
				execute();
			}
		}
	}

	function proxy (fn, context, args) {
		args = Array.from(args);
		args.unshift(context);
		return fn.bind.apply(fn, args);
	}

	return debounce;
});