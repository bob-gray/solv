/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("./class/singleton");

	var EventEngine = require("./event/engine");

	/*meta({
		"type": "module",
		"description": "Exports a singleton instance of event/engine"
	})*/

	return EventEngine.singleton();
});