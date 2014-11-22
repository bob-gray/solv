define(["solv/class/inject-super"], function () {
	"use strict";

	describe("function.injectSuper", function () {
		var secrets;

		beforeEach(function () {

			function Document () {}

			Document.prototype.appendTo = function () {
				this.content += Array.prototype.slice.call(arguments).join("\n");
			}

			Document.prototype.destroy = function () {
				this.content = "";
				this.destroyed = true;
			}

			function TopSecret () {
				this.content = "";
			}

			TopSecret.prototype.appendTo = function () {
				var censored = Array.prototype.slice.call(arguments, 1);
				this.superApply(censored);
			}.injectSuper(Document.prototype.appendTo);

			TopSecret.prototype.destroy = function () {
				this.shredded = true;
				this.superCall();
			}.injectSuper(Document.prototype.destroy);

			secrets = new TopSecret();
		});

		it("should inject super method accessible as superCall within proxy method", function () {
			secrets.destroy();

			expect(secrets.shredded).toBe(true);
			expect(secrets.destroyed).toBe(true);
		});

		it("should inject super method accessible as superApply within proxy method", function () {
			secrets.appendTo("private memo", "public info");

			expect(secrets.content).toBe("public info");
		});

		it("should not error when the calling context is a primitve", function () {
			var empty = function () {};

			empty = empty.injectSuper(empty);

			expect(callWithPrimitive).not.toThrow();

			function callWithPrimitive () {
				empty.call("");
			}
		});
	});
});