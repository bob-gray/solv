require.config({
	paths: {
		solv: "../src"
	}
});

require(
	[
		"spec/abstract/base-test",
		"spec/array/from-test",
		"spec/array/remove",
		"spec/array/copy",
		"spec/array/of",
		"spec/class/create-test",
		"spec/class/method-test",
		"spec/class/singleton-test",
		"spec/error/implementation-not-found-test",
		"spec/error/invalid-return-type-test",
		"spec/event/callbacks-test",
		"spec/function/get-name-test",
		"spec/function/abstract-test",
		"spec/function/invocation-test",
		"spec/function/overload-test",
		"spec/function/signatures-test",
		"spec/function/validate-return-type-test",
		"spec/object/merge-test",
		"spec/shim/object-test",
		"spec/shim/array-test",
		"spec/shim/function-test",
		"spec/meta-test",
		"spec/type-test"
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