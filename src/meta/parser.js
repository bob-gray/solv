define(
	[
		"../meta",
		"../shim/array"
	],
	function (meta) {
		"use strict";

		function Application (root) {
			if (!(this instanceof Application)) {
				return new Application();
			}

			this.root = root;
		}

		Application.prototype.parseDocBlocks = function (blocks) {
			var docs = {};

			blocks.forEach(function (block) {
				docs[block.name] = block;
			});

			return docs;
		};

		Application.prototype.getDocBlocks = (function () {
			var findBlocks = /\bmeta\s*\(((?:[^)"]*|".*")*)\)/g;

			return function (file) {
				var blocks = [];

				file.replace(findBlocks, function (match, block) {
					blocks.push(JSON.parse(block));
				});

				return blocks;
			};
		}());

		Application.prototype.getDocumentation = function (success, fail) {
			var app = this;

			ICEA.ajax({
				url: this.root,
				returnFormat: "plain",
				error: fail,
				callback: function (file) {
					var blocks = app.getDocBlocks(file),
						docs = app.parseDocBlocks(blocks);
					success(docs);
				}
			});
		};

		return Application;
	}
);
