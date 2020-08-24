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
				platform: "Windows 7",
				version: "latest"
			},
			sauce_firefox: {
				base: "SauceLabs",
				browserName: "firefox",
				platform: "Windows 7",
				version: "latest"
			},
			sauce_safari: {
				base: "SauceLabs",
				browserName: "safari",
				platform: "macOS 10.15",
				version: "latest"
			},
			sauce_ie_11: {
				base: "SauceLabs",
				browserName: "internet explorer",
				platform: "Windows 8.1",
				version: "latest"
			},
			sauce_edge: {
				base: "SauceLabs",
				browserName: "microsoftedge",
				platform: "Windows 10",
				version: "latest"
			}
		}
	});
};