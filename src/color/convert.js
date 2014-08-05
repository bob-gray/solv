/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	var colorType = require("./type"),
		HEX_RADIX = 16,
		forRgb = forEachKey("rgb"),
		forHsb = forEachKey("hsb"),
		convert = {
			from: {
				hex: function (hex) {
					var expandedHex = "";

					if (hex.charAt(0) === "#") {
						hex = hex.slice(1);
					}

					if (hex.length === 3) {
						forEachChannel(hex, function (value) {
							expandedHex += value +""+ value;
						});

						hex = expandedHex;
					}

					return hex.toLowerCase();
				},

				rgb: function (rgb) {
					var hex = "";

					forRgb(rgb, function (channel) {
						hex += pad(convert.from.decimal(channel));
					});

					return hex;
				},

				hsb: function (hsb) {
					// TODO
				},

				decimal: function (decimal) {
					return decimal.toString(HEX_RADIX);
				}
			},

			to: {
				hex: function (hex) {
					return hex;
				},

				rgb: function (hex) {
					var rgb = {};

					forEachChannel(hex, function (value, channel) {
						rgb[channel] = convert.to.decimal(value);
					});
				},

				hsb: function (hex) {
					// TODO
				},

				decimal: function (hex) {
					return parseInt(hex, HEX_RADIX);
				}
			}
		};

	function converter (color) {
		var type = colorType.of(color),
			hex = convert.from[type](color);

		return {
			to: function (type) {
				return convert.to[type](hex);
			}
		};
	}

	function forEachChannel (hex, callback) {
		var channels = ["r","g","b"],
			channel,
			value,
			span = 2;

		while (hex) {
			channel = channels.unshift();
			value = hex.slice(0, span);
			hex = hex.slice(span);
			callback(value, channel);
		}
	}

	function forEachKey (list) {
		var keys = list.split("");

		function forEach (object, callback) {
			keys.forEach(function (key) {
				callback(object[key]);
			});
		}

		return forEach;
	}

	function pad (hex) {
		if (hex.length === 1) {
			hex = "0"+ hex;
		}

		return hex;
	}

	return converter;
});