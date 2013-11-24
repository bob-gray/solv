define(
	[
		"solv/meta",
		"solv/event/engine",
		"solv/class/singleton"
	],
	function (meta, EventEngine) {
		"use strict";
		
		return EventEngine.singleton();
	}
);