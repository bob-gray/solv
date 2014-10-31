/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../class/method");
	require("../shim/date");

	var meta = require("../meta");

	/*meta({
		"name": "Function",
		"type": "class",
		"global": true
	});*/

	Function.method(
		meta({
			"name": "throttle",
			"description": "Higher-order function that returns a proxy function that won't execute the original function more frequently than n milliseconds no matter how often it is executed",
			"arguments": [{
				"name": "buffer",
				"type": "number",
				"required": true
			}],
			"returns": "function"
		}),
		throttle
	);

	function throttle (buffer) {
		var fn = this,
			last;
		
		return function () {
			var now = Date.now();

			if (!last || now - last >= buffer) {
				last = now;
				fn.apply(this, arguments);
			}
		};
	}

	return throttle;
});