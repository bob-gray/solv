if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta");

	meta({
		"name": "Id",
		"type": "class",
		"description": "A simple counter"
	});

	meta({
		"name": "getNext",
		"description": "Gets the next id",
		"arguments": [],
		"returns": {
			"type": "number",
			"description": "An integer. Starting at 1. Increments 1 with each call."
		}
	});

	function Id () {
		var next = 0;

		this.getNext = function () {
			next += 1;
			return next;
		};

		return this;
	}

	return Id;
});