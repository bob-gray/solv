module.exports = function (config) {
	"use strict";

	config.set({
		files: [{
			pattern: "src/**/*.js",
			included: false
		}, {
			pattern: "tests/spec/**/*-test.js",
			included: false
		}, {
			pattern: "tests/runners/karma.js",
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
			"IE"
		],
		reporters: [
			"dots"
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
				platform: "Windows 7"
			},
			sauce_safari: {
				base: "SauceLabs",
				browserName: "safari",
				platform: "OS X 10.11"
			},
			sauce_ie_9: {
				base: "SauceLabs",
				browserName: "internet explorer",
				platform: "Windows 7",
				version: "9"
			},
			sauce_ie_10: {
				base: "SauceLabs",
				browserName: "internet explorer",
				platform: "Windows 7",
				version: "10"
			},
			sauce_ie_11: {
				base: "SauceLabs",
				browserName: "internet explorer",
				platform: "Windows 8.1",
				version: "11"
			},
			sauce_edge: {
				base: "SauceLabs",
				platform: "Windows 10",
				browserName: "microsoftedge"
			}
		}
	});
};