require.config({
	baseUrl: "../",
	paths: {
		"solv": "src",
		"spec": "tests/spec",
		"jasmine-core": "bower_components/jasmine/lib/jasmine-core",
	},
	shim: {
		"jasmine-core/jasmine-html": [
			"jasmine-core/jasmine"
		],
		"jasmine-core/boot": [
			"jasmine-core/jasmine",
			"jasmine-core/jasmine-html"
		]
	}
});

require(["jasmine-core/boot"], function () {
	require(
		[
			"spec/abstract/base-test",
			"spec/abstract/emitter-test",
			"spec/abstract/observable-test",
			"spec/array/add-test",
			"spec/array/average-test",
			"spec/array/contains-test",
			"spec/array/copy-test",
			"spec/array/empty-test",
			"spec/array/first-test",
			"spec/array/from-test",
			"spec/array/insert-at-test",
			"spec/array/is-empty-test",
			"spec/array/last-test",
			"spec/array/max-test",
			"spec/array/min-test",
			"spec/array/of-test",
			"spec/array/remove-first-test",
			"spec/array/remove-last-test",
			"spec/array/remove-test",
			"spec/array/replace-first-test",
			"spec/array/replace-last-test",
			"spec/array/replace-test",
			"spec/array/sum-test",
			"spec/class/create-test",
			"spec/class/inject-super-test",
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
			"spec/event/name-test",
			"spec/function/abstract-test",
			"spec/function/constrict-test",
			"spec/function/debounce-test",
			"spec/function/default-args-test",
			"spec/function/get-name-test",
			"spec/function/invocation-test",
			"spec/function/overload-test",
			"spec/function/signatures-test",
			"spec/function/throttle-test",
			"spec/function/validate-return-type-test",
			"spec/object/clone-test",
			"spec/object/copy-test",
			"spec/object/for-each-test",
			"spec/object/is-empty-test",
			"spec/object/merge-test",
			"spec/object/validate-test",
			"spec/regexp/escape-test",
			"spec/shim/array-test",
			"spec/shim/date-test",
			"spec/shim/function-test",
			"spec/string/contains-every-test",
			"spec/string/contains-some-test",
			"spec/string/contains-test",
			"spec/string/repeat-test",
			"spec/string/trim-test",
			"spec/string/interpolate-test",
			"spec/shim/object-test",
			"spec/util/id-test",
			"spec/util/bundle-test",
			"spec/meta-test",
			"spec/type-test"
		],
		function () {
			"use strict";

			// this is a little wierd to me...
			// I believe this works because jasmine is loaded after window.onload because it is loaded with requirejs
			// then we manually call it here to tell jasmine to execute
			// ... it seems kinda brittle ... but it seems to work
			window.onload();
		}
	);
});