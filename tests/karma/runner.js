(function loadTestSuiteModules () {
	"use strict";

	var karmaFiles = getObjectKeys(__karma__.files),
		testModuleNamePattern = /\-test\.js$/,
		testModules = filterArrayWithPattern(karmaFiles, testModuleNamePattern);

	require({
		baseUrl: "/base",
		deps: testModules,
		callback: __karma__.start
	});

	function getObjectKeys (object) {
		var	keys = [];
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				keys.push(key);
			}
		}
		return keys;
	}

	function filterArrayWithPattern (array, pattern) {
		var filtered = [];
		forEach(array, function (element) {
			if (pattern.test(element)) {
				filtered.push(element);
			}
		});
		return filtered;
	}

	function forEach (array, callback) {
		var length = array.length;
		for (var i = 0; i < length; i += 1) {
			callback(array[i]);
		}
	}
}());