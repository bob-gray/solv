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
			username: "bob-gray",
			accessKey: "d3d26979-11cc-4b2f-8b87-e41410894150"
		},
		customLaunchers: {
			sl_chrome: {
				base: "SauceLabs",
				browserName: "chrome",
				platform: "Windows 7"
			},
			sl_firefox: {
				base: "SauceLabs",
				browserName: "firefox",
				version: "27"
			},
			sl_ios_safari: {
				base: "SauceLabs",
				browserName: "iphone",
				platform: "OS X 10.9",
				version: "7.1"
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