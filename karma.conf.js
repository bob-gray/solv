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
		singleRun: true,
		sauceLabs: {
			testName: "Solv",
			recordScreenshots: false
		},
		customLaunchers: {
			sl_chrome: {
				base: "SauceLabs",
				browserName: "chrome",
				platform: "Windows 7"
			},
			sl_ie_11: {
				base: "SauceLabs",
				browserName: "internet explorer",
				platform: "Windows 8.1",
				version: "11"
			}
		}
	});
};