define(["src/function/invocation"], function (Invocation) {
	"use strict";

	describe("Invocation class", function () {
		it("has a static property (Invocation.instance) equal to the latest created instance", function () {
			var invocation = new Invocation ();
			expect(invocation).toBe(Invocation.instance);
		});

		it("instances have a signature property that's default is null", function () {
			var invocation = new Invocation ();
			expect(invocation.signature).toBeNull();
		});

		it("instances have a method setSignature(args) that sets the signature property by inspecting the types of the args passed to it", function () {
			var invocation = new Invocation ();
			set([], {}, function(){});
			function set () {
				invocation.setSignature(arguments);
			}
			expect(invocation.signature).toBe("array,object,function");
		});

		it("instances have a nonMatchingSignatures property that's default is an empty array", function () {
			var invocation = new Invocation ();
			expect(isArray(invocation.nonMatchingSignatures)).toBe(true);
			expect(invocation.nonMatchingSignatures.length).toBe(0);
		});

		it("instances have a method addNonMatchingSignature(implementationSignature) that pushes onto the nonMatchingSignatures array", function () {
			var invocation = new Invocation (),
				badSignature = "array,!null,function";
			invocation.addNonMatchingSignature(badSignature);
			invocation.addNonMatchingSignature(badSignature);
			expect(invocation.nonMatchingSignatures.length).toBe(2);
			expect(invocation.nonMatchingSignatures[0]).toBe(badSignature);
			expect(invocation.nonMatchingSignatures[1]).toBe(badSignature);
		});

		it("instances have methods isStart(next) and setNext(next) that work together", function () {
			var invocation = new Invocation();
			expect(invocation.isStart(next)).toBe(true);
			invocation.setNext(next);
			expect(invocation.isStart(next)).toBe(false);
			function next () {}
		});

		it("instances have a method testImplementation(compileImplementationSignature) that test signature property", function () {
			var invocation = new Invocation(),
				compiledMatch = /^array,object,function$/,
				compiledNonMatch = /^string,null$/;
			set([], {}, function(){});
			function set () {
				invocation.setSignature(arguments);
			}
			expect(invocation.testImplementation(compiledMatch)).toBe(true);
			expect(invocation.testImplementation(compiledNonMatch)).toBe(false);
		});

		it("instances have a method proceed(context, args) which invokes the next property, applying context and args, and returns the result", function () {
			var invocation = new Invocation(),
				context = {
					i: 1
				};
			function next (n) {
				this.i += n;
				expect(this).toBe(context);
				return this.i;
			}
			invocation.setNext(next);
			expect(invocation.proceed(context, [2])).toBe(3);
		});

		it("instances have a method matchingImplementationFound(implementation) that works with proceed(context, args)", function () {
			var invocation = new Invocation(),
				context = {
					i: 1
				};
			set([], {}, function(){});
			function set () {
				invocation.setSignature(arguments);
			}function next (n) {
				this.i += n;
				expect(this).toBe(context);
				return this.i;
			}
			invocation.matchingImplementationFound(next);
			expect(invocation.proceed(context, [2])).toBe(3);
			expect(invocation.signature).toBeNull();
			expect(invocation.isStart(next)).toBe(true);
		});

		it("instances have a method reset() that resets it back to it's initial default state", function () {
			var invocation = new Invocation (),
				badSignature = "array,!null,function";
			set([], {}, function(){});
			function set () {
				invocation.setSignature(arguments);
			}
			invocation.addNonMatchingSignature(badSignature);
			expect(invocation.nonMatchingSignatures.length).toBeGreaterThan(0);
			expect(invocation.signature).not.toBeNull();
			invocation.reset();
			expect(invocation.nonMatchingSignatures.length).toBe(0);
			expect(invocation.signature).toBeNull();
		});

		function isArray (value) {
			return "Array" === Object.prototype.toString.call(value).slice(8, -1);
		}
	});
});
