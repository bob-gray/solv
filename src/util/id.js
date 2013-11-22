define(
	[
		"solv/meta"
	],
	function (meta) {
		"use strict";
		
		meta({
			"name": "Id",
			"type": "class",
			"description": "A simple counter"
		});
		
		function Id () {
			var next = 0;
			
			meta({
				"name": "getNext",
				"description": "Gets the next id",
				"arguments": [],
				"returns": {
					"type": "number",
					"description": "An integer. Starting at 1. Increments 1 with each call."
				}
			});
			
			this.getNext = function () {
				next += 1;
				return next;
			};
			
			return this;
		}
		
		return Id;
	}
);