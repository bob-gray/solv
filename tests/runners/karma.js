(function loadTestSuiteModules () {
	"use strict";

	var karmaFiles = Object.keys(__karma__.files),
		testModulePattern = /-test\.js$/,
		testModules = karmaFiles.filter(isTestModule);

	function isTestModule (file) {
		return testModulePattern.test(file);
	}

	require.config({
		baseUrl: "/base",
		paths: {
			"solv": "src"
		}
	});
	
	require(testModules, __karma__.start);
}());