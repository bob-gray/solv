define(
	[
		"./meta",
		"./event/engine",
		"./class/singleton"
	],
	function (meta, Event) {
		"use strict";
		
		return Event.singleton();
	}
);