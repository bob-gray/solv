define(
	[
		"solv/meta",
		"solv/event/engine",
		"solv/class/singleton"
	],
	function (meta, Event) {
		"use strict";
		
		return Event.singleton();
	}
);