/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var Color,
		meta = require("./meta"),
		convert = require("./color/convert"),
		createClass = require("./class");

	Color = createClass(
		meta({
			"name": "Color",
			"type": "class",
			"arguments": [{
				"name": "value",
				"type": "string|number|object"
			}]
		}),
		init
	);

	Color.method(
		meta({
			"name": "to",
			"arguments": [{
				"name": "type",
				"type": "string",
				"description": "hex, rgb, hsb, or decimal"
			}],
			"returns": {
				"type": "string|number|object",
				"description": "hex are strings, rgb and hsb are objects and decimal are numbers"
			}
		}),
		to
	);

	Color.method(
		meta({
			"name": "toString",
			"arguments": []
		}),
		toString
	);

	Color.method(
		meta({
			"name": "valueOf",
			"arguments": []
		}),
		valueOf
	);

	function init (color) {
		this.hex = convert(color).to("hex");
	}

	function to (type) {
		return convert(this.hex).to(type);
	}

	function toString () {
		return "#"+ this.hex;
	}

	function valueOf () {
		return this.to("decimal");
	}

	return Color;
});