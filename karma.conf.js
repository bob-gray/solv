"use strict";

module.exports = function (config) {
	config.set({
		files: [{
			pattern: "src/**/*.js",
			included: false
		}, {
			pattern: "tests/spec/**/*-test.js",
			included: false
		}, {
			pattern: "tests/karma-runner.js",
			included: true
		}],
		frameworks: [
			"jasmine",
			"requirejs"
		],
		browsers: [
			"PhantomJS",
			"Chrome",
			"Firefox",
			"Safari",
			"IE"
        ],
		singleRun: true
	});
};