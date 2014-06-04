if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var meta = require("../meta"),
		type = require("../type");

	var DateProto = Date.prototype;

	function move () {

	}

	DateProto.move = move;	
});