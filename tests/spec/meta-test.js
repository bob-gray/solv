define(["src/meta"], function (meta) {
	"use strict";

	describe("meta()", function () {
		it("returns the object that was passed in", function () {
			var data = {};
			expect(meta(data)).toBe(data);
		});

		it("looks up data.mixins as an amd module", function () {
			var data = meta({
				"mixins": "src/meta"
			});
			expect(data.mixins).toBe(meta);
		});

		it("looks up data.extends as an amd module", function () {
			var data = meta({
				"extends": "src/meta"
			});
			expect(data["extends"]).toBe(meta);
		});

		it("looks up data.mixins as a global", function () {
			var data = meta({
				"mixins": "describe"
			});
			expect(data.mixins).toBe(describe);
		});

		it("looks up data.extends as a global", function () {
			var data = meta({
				"extends": "describe"
			});
			expect(data["extends"]).toBe(describe);
		});
	});
});

