require.config({
	paths: {
		solv: "../../src",
		spec: "../spec"
	}
});

require(
	[
		"spec/abstract/base-test",
		"spec/abstract/emitter-test",
		"spec/abstract/observable-test",
		"spec/array/add-test",
		"spec/array/contains-test",
		"spec/array/copy-test",
		"spec/array/from-test",
		"spec/array/of-test",
		"spec/array/remove-test",
		"spec/class/create-test",
		"spec/class/method-test",
		"spec/class/singleton-test",
		"spec/date/compare-test",
		"spec/date/format-test",
		"spec/date/hours-from-standard-test",
		"spec/date/is-daylight-savings-test",
		"spec/date/move-test",
		"spec/date/is-leap-year-test",
		"spec/error/implementation-not-found-test",
		"spec/error/invalid-return-type-test",
		"spec/event/callbacks-test",
		"spec/event/engine-test",
		"spec/event/listener-test",
		"spec/event/listeners-test",
		"spec/function/abstract-test",
		"spec/function/constrict-test",
		"spec/function/default-args-test",
		"spec/function/get-name-test",
		"spec/function/invocation-test",
		"spec/function/overload-test",
		"spec/function/signatures-test",
		"spec/function/validate-return-type-test",
		"spec/object/clone-test",
		"spec/object/copy-test",
		"spec/object/for-each-test",
		"spec/object/is-empty-test",
		"spec/object/merge-test",
		"spec/object/validate-test",
		"spec/shim/array-test",
		"spec/shim/date-test",
		"spec/shim/function-test",
		"spec/shim/object-test",
		"spec/meta-test",
		"spec/type-test"
	],
	function () {
		"use strict";

		var jasmineEnv = jasmine.getEnv(),
			htmlReporter = new jasmine.HtmlReporter(),
			jsReporter = new jasmine.JSReporter();

		jasmineEnv.updateInterval = 1000;

		jasmineEnv.addReporter(htmlReporter);
		jasmineEnv.addReporter(jsReporter);

		jasmineEnv.specFilter = function(spec) {
			return htmlReporter.specFilter(spec);
		};

		jasmineEnv.execute();
	}
);