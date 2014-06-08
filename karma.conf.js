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
			sauce_chrome: {
				base: "SauceLabs",
				browserName: "chrome",
				platform: "Windows 7"
			},
			sauce_firefox: {
				base: "SauceLabs",
				browserName: "firefox",
				platform: "Linux"
			},
			sauce_safari: {
				base: "SauceLabs",
				browserName: "safari",
				platform: "OS X 10.6"
			},
			sauce_ie_11: {
				base: "SauceLabs",
				browserName: "internet explorer",
				platform: "Windows 8.1",
				version: "11"
			},
			sauce_ie_8: {
				base: "SauceLabs",
				browserName: "internet explorer",
				platform: "Windows XP",
				version: "8"
			}
		}
	});
};