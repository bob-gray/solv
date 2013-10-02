require.config({
	paths: {
		src: "../src"
	}
});

require(
	[
		"spec/class-test",
		"spec/type-test",
		"spec/function/get-name-test",
		"spec/function/abstract-test",
		"spec/function/implementation-not-found-test",
		"spec/function/invocation-test",
		"spec/function/overload-test",
		"spec/function/signatures-test",
		"spec/function/validate-return-type-test"
	],
	function () {
		"use strict";

		var jasmineEnv = jasmine.getEnv(),
			htmlReporter = new jasmine.HtmlReporter();

		jasmineEnv.updateInterval = 1000;
		jasmineEnv.addReporter(htmlReporter);
		jasmineEnv.specFilter = function(spec) {
			return htmlReporter.specFilter(spec);
		};
		jasmineEnv.execute();
	}
);