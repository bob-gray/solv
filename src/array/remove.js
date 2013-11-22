define(
	[
		"../meta",
		"../class/method",
		"../shim/array"
	],
	function (meta) {
		"use strict";
		
		meta({
			"name": "Array",
			"type": "class",
			"global": true
		});
		
		Array.method(
			meta({
				"name": "remove",
				"descriptions": "Removes the first occurence of an item from an array",
				"shim": true,
				"arguments": [{
					"name": "item",
					"type": "any"
				}]
			}),
			remove
		);
		
		function remove (item) {
			var index = this.indexOf(item);
			
			if (isFound(index)) {
				this.splice(index, 1);
			}
		}
		
		function isFound (index) {
			return index > -1;
		}
		
		return remove;
	}
);