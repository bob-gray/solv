define(["src/shim/array"], function (arrayShims) {
	"use strict";

	var nativeMethods = {},
		shimMethods = [
			"forEach",
			"reduce",
			"indexOf",
			"map",
			"filter",
			"every",
			"some"
		];

	function runTests (method) {
		if (arrayMethodIsNotShim(method)) {
			nativeTests(method);
		}
		shimTests(method);
	}

	function arrayMethodIsNotShim (method) {
		return Array.prototype[method] !== arrayShims[method];
	}

	function nativeTests (method) {
		describe("array."+ method +" [native]", function () {
			tests[method]();
		});
	}

	function shimTests (method) {
		describe("array."+ method +" [shim]", function () {
			beforeEach(function () {
				injectArrayShim(method);
			});
			afterEach(function () {
				removeArrayShim(method);
			});
			tests[method]();
		});
	}

	function injectArrayShim (method) {
		nativeMethods[method] = Array.prototype[method];
		Array.prototype[method] = arrayShims[method];
	}

	function removeArrayShim (method) {
		Array.prototype[method] = nativeMethods[method];
		nativeMethods[method] = null;
	}

	function isArray (value) {
		return Object.prototype.toString.call(value) === "[object Array]";
	}

	var tests = {
		forEach: function () {
			it("executes callback once per array element", function () {
				var array = [1, 2, 3];
				array.forEach(function (num, index, arr) {
					expect(num).toBe(index + 1);
					expect(arr).toBe(array);
				});
			});

			it("passes (element, index, array) to callback", function () {
				var array = [1, 2, 3];
				array.forEach(function (num, index, arr) {
					expect(num).toBe(arr[index]);
				});
			});

			it("loops 0 to length forwards", function () {
				var array = [1, 2, 3];
				[1, 2, 3].forEach(function (num, index, arr) {
					expect(num).toBe(array.shift());
				});
			});

			it("executes callback with context passed as second parameter", function () {
				var array = [1, 2, 3],
					context = {};
				array.forEach(function (num, index, arr) {
					expect(this).toBe(context);
				}, context);
			});
		},

		reduce: function () {
			/* jshint -W072 */ //reduce callback accepts 4 parameters
			it("passes each element to the callback in sequences when initialValue is supplied", function () {
				var arr = [1, 2, 3, 4],
					control = arr.slice(0);
				arr.reduce(function (previousValue, currentValue, index, array) {
					expect(arr[index]).toBe(control.shift());
				}, 0);
			});

			it("assigns the first element in the array as the initial value if not initial value is supplied", function () {
				var arr = [1, 2, 3, 4],
					firstLoop = true;
				arr.reduce(function (previousValue, currentValue, index, array) {
					if (firstLoop) {
						expect(previousValue).toBe(arr[0]);
						firstLoop = false;
					}
				});
			});

			it("doesn't execute callback for first element if not initial value is supplied", function () {
				var arr = [1, 2, 3, 4],
					firstLoop = true;
				arr.reduce(function (previousValue, currentValue, index, array) {
					if (firstLoop) {
						expect(currentValue).toBe(arr[1]);
						firstLoop = false;
					}
				});
			});

			it("passes index to callback", function () {
				var arr = [1, 2, 3, 4];
				arr.reduce(function (previousValue, currentValue, index, array) {
					expect(arr[index]).toBe(array[index]);
				});
			});

			it("passes array to callback", function () {
				var arr = [1, 2, 3, 4];
				arr.reduce(function (previousValue, currentValue, index, array) {
					expect(arr).toBe(array);
				});
			});

			it("passes the value returned from each callback execution the to the next execution", function () {
				var arr = [1, 2, 3, 4],
					previous = 0;
				arr.reduce(function (previousValue, currentValue, index, array) {
					expect(previousValue).toBe(previous);
					previous = previous + currentValue;
					return previous;
				}, 0);
			});

			it("returns the value returned by the last execution of callback or initialValue if callback is not executed", function () {
				var arr = [1, 2, 3, 4],
					result;

				result = arr.reduce(add);
				expect(result).toBe(10);

				result = arr.reduce(add, 10);
				expect(result).toBe(20);

				result = [].reduce(add, 10);
				expect(result).toBe(10);

				result = [0].reduce(add);
				expect(result).toBe(0);

				function add (previousValue, currentValue) {
					return previousValue + currentValue;
				}

				result = arr.reduce(last);
				expect(result).toBe("last");

				function last (previousValue, currentValue, index, array) {
					var lastIndex = array.length - 1;
					if (index === lastIndex) {
						return "last";
					}
				}
			});
			/* jshint +W072 */
		},

		indexOf: function () {
			it("return the first index of a matching element", function () {
				var array = ["a", "b", "c"],
					found = array.indexOf("b");
				expect(found).toBe(1);
				expect(array[found]).toBe("b");
			});

			it("returns -1 if not found", function () {
				var notFound = ["a", "b", "c"].indexOf("z");
				expect(notFound).toBe(-1);
			});

			it("optionally accepts a starting index", function () {
				var found = ["a","b","c"].indexOf("c", 1),
					notFound = ["a","b","c"].indexOf("a", 1);
				expect(found).toBe(2);
				expect(notFound).toBe(-1);
			});

			it("starting index can be negative", function () {
				var notFound = ["a","b","c"].indexOf("a", -1),
					found = ["a","b","c"].indexOf("b", -3);
				expect(notFound).toBe(-1);
				expect(found).toBe(1);
			});
		},

		map: function () {
			it("returns new array", function () {
				var array = [1, 2, 3],
					other = array.map(function (num, index, arr) {
						return num;
					});
				expect(isArray(other)).toBe(true);
				expect(other).toNotBe(array);
			});

			it("new array is filled with items returned from callback", function () {
				var array = [1, 2, 3],
					other = array.map(function (num, index, arr) {
						return num * 2;
					});
				expect(other[0]).toBe(2);
				expect(other[1]).toBe(4);
				expect(other[2]).toBe(6);
			});

			it("executes callback once per array element", function () {
				var array = [1, 2, 3];
				array.map(function (num, index, arr) {
					expect(num).toBe(index + 1);
					expect(arr).toBe(array);
				});
			});

			it("passes (element, index, array) to callback", function () {
				var array = [1, 2, 3];
				array.map(function (num, index, arr) {
					expect(num).toBe(arr[index]);
				});
			});

			it("loops 0 to length forwards", function () {
				var array = [1, 2, 3];
				[1, 2, 3].map(function (num, index, arr) {
					expect(num).toBe(array.shift());
				});
			});

			it("executes callback with context passed as second parameter", function () {
				var array = [1, 2, 3],
					context = {};
				array.map(function (num, index, arr) {
					expect(this).toBe(context);
				}, context);
			});
		},

		filter: function () {
			it("returns new array", function () {
				var array = [1, 2, 3],
					other = array.filter(function (num, index, arr) {
						return false;
					});
				expect(isArray(other)).toBe(true);
				expect(other).toNotBe(array);
			});

			it("new array is filled with items that produced a truthy response from callback", function () {
				var array = [1, 2, 3],
					other = array.filter(function (num, index, arr) {
						return num > 1;
					});
				expect(other.length).toBe(2);
				expect(other[0]).toBe(2);
				expect(other[1]).toBe(3);
			});

			it("executes callback once per array element", function () {
				var array = [1, 2, 3];
				array.filter(function (num, index, arr) {
					expect(num).toBe(index + 1);
					expect(arr).toBe(array);
				});
			});

			it("passes (element, index, array) to callback", function () {
				var array = [1, 2, 3];
				array.filter(function (num, index, arr) {
					expect(num).toBe(arr[index]);
				});
			});

			it("loops 0 to length forwards", function () {
				var array = [1, 2, 3];
				[1, 2, 3].filter(function (num, index, arr) {
					expect(num).toBe(array.shift());
				});
			});

			it("executes callback with context passed as second parameter", function () {
				var array = [1, 2, 3],
					context = {};
				array.filter(function (num, index, arr) {
					expect(this).toBe(context);
				}, context);
			});
		},

		every: function () {
			it("executes call back once for each element until callback returns a falsey", function () {
				var arr = [1, 2, 3, 4],
					count = 0;
				arr.every(function (element, index, array) {
					count += 1;
					return element < 3;
				});
				expect(count).toBe(3);
				count = 0;
				arr.every(function () {
					count += 1;
					return true;
				});
				expect(count).toBe(4);
				count = 0;
				arr.every(function () {
					count += 1;
				});
				expect(count).toBe(1);
			});

			it("return is false if any callback execution returns falsey value", function () {
				var arr = [1, 2, 3, 4],
					result = arr.every(function (element, index, array) {
						return element < 3;
					});
				expect(result).toBe(false);
				result = arr.every(function (element, index, array) {
					if (element < 2) {
						return true;
					}
				});
				expect(result).toBe(false);
				result = arr.every(function (element, index, array) {
					return element;
				});
				expect(result).toBe(true);
			});

			it("accepts a context to be passed to the callback", function () {
				var arr = [1, 2, 3, 4],
					context = {};
				arr.every(function (element, index, array) {
					expect(this).toBe(context);
					return this;
				}, context);
			});
		},

		some: function () {
			it("executes call back once for each element until callback returns a truthy", function () {
				var arr = [1, 2, 3, 4],
					count = 0;
				arr.some(function (element, index, array) {
					count += 1;
					return element > 2;
				});
				expect(count).toBe(3);
				count = 0;
				arr.some(function () {
					count += 1;
					return true;
				});
				expect(count).toBe(1);
				count = 0;
				arr.some(function () {
					count += 1;
				});
				expect(count).toBe(4);
			});

			it("return is false if any callback execution returns falsey value", function () {
				var arr = [1, 2, 3, 4],
					result = arr.every(function (element, index, array) {
						return element < 3;
					});
				expect(result).toBe(false);
				result = arr.every(function (element, index, array) {
					if (element < 2) {
						return true;
					}
				});
				expect(result).toBe(false);
				result = arr.every(function (element, index, array) {
					return element;
				});
				expect(result).toBe(true);
			});

			it("accepts a context to be passed to the callback", function () {
				var arr = [1, 2, 3, 4],
					context = {};
				arr.every(function (element, index, array) {
					expect(this).toBe(context);
					return this;
				}, context);
			});
		}
	};

	shimMethods.forEach(runTests);

	describe("Array.from)", function () {
		it("returns a real array", function () {
			expect(isArray(arguments)).toBe(false);
			expect(isArray(Array.from(arguments))).toBe(true);
		});

		it("returns a real array filled with the same values as arguments", function () {
			var obj = {};
			test("first arg", obj, null);
			function test () {
				var args = Array.from(arguments);
				expect(args.length).toBe(3);
				expect(args[0]).toBe("first arg");
				expect(args[1]).toBe(obj);
				expect(args.pop()).toBeNull();
				expect(args.length).toBe(2);
			}
		});
	});
});