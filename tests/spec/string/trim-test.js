define(["solv/string/trim"], function () {
	"use strict";

	describe("string.trim", function () {
		it("should remove spaces from the front of a string", function () {
			var string = "  hello world";

			expect(string.trim().length).toBe(string.length - 2);
		});

		it("should remove tabs from the front of a string", function () {
			var string = "\t\thello world";

			expect(string.trim().length).toBe(string.length - 2);
		});

		it("should remove line breaks from the front of a string", function () {
			var string = "\n\nhello world";

			expect(string.trim().length).toBe(string.length - 2);
		});

		it("should remove spaces from the end of a string", function () {
			var string = "hello world   ";

			expect(string.trim().length).toBe(string.length - 3);
		});

		it("should remove tabs from the end of a string", function () {
			var string = "hello world\t\t\t";

			expect(string.trim().length).toBe(string.length - 3);
		});

		it("should remove tabs from the end of a string", function () {
			var string = "hello world\n\n\n";

			expect(string.trim().length).toBe(string.length - 3);
		});

		it("should remove whitespace from both ends of a string", function () {
			var string = "  hello world  ";

			expect(string.trim().length).toBe(string.length - 4);
		});

		it("should remove mixed whitespace", function () {
			var string = "\t\t  \n hello world  \n\n\n ";

			expect(string.trim().length).toBe(string.length - 12);
		});

		it("should remove whitespace only at the very front or end not line by line", function () {
			var string = "\t\thello world  \n \tfoo bar";

			expect(string.trim().length).toBe(string.length - 2);
		});
	});

	describe("string.trimLeft", function () {
		it("should remove spaces from the front of a string", function () {
			var string = "  hello world  ";

			expect(string.trimLeft().length).toBe(string.length - 2);
		});

		it("should remove tabs from the front of a string", function () {
			var string = "\t\thello world\t\t";

			expect(string.trimLeft().length).toBe(string.length - 2);
		});

		it("should remove line breaks from the front of a string", function () {
			var string = "\n\nhello world\n\n";

			expect(string.trimLeft().length).toBe(string.length - 2);
		});

		it("should remove mixed whitespace", function () {
			var string = "\t\t  \n hello world";

			expect(string.trimLeft().length).toBe(string.length - 6);
		});

		it("should remove whitespace only at the very front not line by line", function () {
			var string = "\t\thello world  \n \tfoo bar";

			expect(string.trimLeft().length).toBe(string.length - 2);
		});

		it("should remove whitespace only at the front and not the end", function () {
			var string = "\t\thello world  \n \t ";

			expect(string.trimLeft().length).toBe(string.length - 2);
		});
	});

	describe("string.trimRight", function () {
		it("should remove spaces from the end of a string", function () {
			var string = "hello world   ";

			expect(string.trimRight().length).toBe(string.length - 3);
		});

		it("should remove tabs from the end of a string", function () {
			var string = "hello world\t\t\t";

			expect(string.trimRight().length).toBe(string.length - 3);
		});

		it("should remove tabs from the end of a string", function () {
			var string = "hello world\n\n\n";

			expect(string.trimRight().length).toBe(string.length - 3);
		});

		it("should remove mixed whitespace", function () {
			var string = "hello world\t\t  \n ";

			expect(string.trimRight().length).toBe(string.length - 6);
		});

		it("should remove whitespace only at the very end not line by line", function () {
			var string = "\t\thello world  \nfoo bar \t";

			expect(string.trimRight().length).toBe(string.length - 2);
		});

		it("should remove whitespace only at the end and not the front", function () {
			var string = "\t\thello world  \n \t ";

			expect(string.trimRight().length).toBe(string.length - 6);
		});
	});
});