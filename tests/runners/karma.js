(function loadTestSuiteModules () {
	"use strict";

	var karmaFiles = keys(__karma__.files),
		testModulePattern = /-test\.js$/,
		testModules = filter(karmaFiles, isTestModule);

	require.config({
		baseUrl: "/base",
		paths: {
			"solv": "src"
		}
	});

	require(testModules, __karma__.start);

	function keys (object) {
		if (Object.keys) {
			return Object.keys(object);
		}

		var keys = [],
			key;

		for (key in object) {

			if (object.hasOwnProperty(key)) {
				keys.push(key);
			}
		}

		return keys;
	}

	function filter (array, fn) {
		if (array.filter) {
			return array.filter(fn);
		}

		var i = 0,
			length = array.length,
			filtered = [],
			item;

		for (; i < length; i += 1) {

			item = array[i];

			if (fn(item)) {
				filtered.push(item);
			}
		}

		return filtered;
	}

	function isTestModule (file) {
		return testModulePattern.test(file);
	}
}());