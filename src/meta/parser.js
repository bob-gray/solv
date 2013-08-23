define(
	[
		"../meta",
		"../class",
		"../abstract/base",
		"../shim/array"
	],
	function (meta, Class, Base) {
		"use strict";

		var Parser = Class(
			meta({
				"name": "Parser",
				"extends": Base,
				"arguments": [{
					"name"; "root",
					"type": "string"
				}]
			}),
			function (root) {
				this.root = root;
			}
		);

		Parser.regex = /\bmeta\s*\(((?:[^)"]*|".*")*)\)/g;

		Parser.method(
			meta({
				"name": "getMeta",
				"arguments": [{
					"name": "success",
					"type": "function"
				}, {
					"name": "fail",
					"type": "function"
				}]
			}),
			function (success, fail) {
				ICEA.ajax({
					url: this.root,
					returnFormat: "plain",
					error: fail,
					callback: this.proxy(parse, success)
				});
			}
		);

		function parse (success, file) {
			var blocks = [];
			file.replace(findBlocks, function (match, block) {
				blocks.push(JSON.parse(block));
			});
			return blocks;
		}

		return Parser;
	}
);
