"use strict";

module.exports = function (grunt) {
	registerTasks(grunt);
	configureTasks(grunt);
	loadTasks(grunt);
};

function registerTasks (grunt) {
	grunt.registerTask("default", [
		"lint",
		"test",
		"karma:sauce"
	]);
	
	grunt.registerTask("lint", [
		"jshint"
	]);
	
	grunt.registerTask("test", [
		"karma:phantom"
	]);
	
	grunt.registerTask("coverage", [
		"karma:coverage"
	]);
	
	grunt.registerTask("start-watch", [
		"karma:watch:start",
		"watch"
	]);

	grunt.registerTask("sauce", [
		"connect",
		"saucelabs-jasmine"
	]);
}

function configureTasks (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			all: {
				files: [
					"src/**/*.js",
					"tests/spec/**/*.js"
				],
				tasks: [
					"lint",
					"karma:watch:run"
				]
			}
		},
		connect: {
			server: {
				options: {
					base: "",
					port: 9999
				}
			}
		},
		"saucelabs-jasmine": {
			all: {
				options: {
					urls: [
						"http://127.0.0.1:9999/tests/index.html"
					],
					testname: "solv",
					tags: [
						"master"
					],
					tunnelTimeout: 5,
					build: process.env.TRAVIS_JOB_ID,
					concurrency: 3,
					browsers: [{
						browserName: "firefox",
						version: "19",
						platform: "XP"
					}, {
						browserName: "chrome",
						platform: "XP"
					}, {
						browserName: "chrome",
						platform: "linux"
					}, {
						browserName: "internet explorer",
						version: "11",
						platform: "WIN8"
					}, {
						browserName: "internet explorer",
						version: "10",
						platform: "WIN7"
					}, {
						browserName: "internet explorer",
						version: "9",
						platform: "VISTA"
					}, {
						browserName: "internet explorer",
						version: "8",
						platform: "XP"
					}]
				}
			}
		},
		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			lib: {
				src: [
					"src/**/*.js"
				]
			},
			tests: {
				src: [
					"tests/runner.js",
					"tests/karma/runner.js",
					"tests/spec/**/*.js"
				]
			}
		},
		complexity: {
			options: {
				breakOnErrors: true,
				errorsOnly: true,
				cyclomatic: 5,
				halstead: 10,
				maintainability: 80,
				hideComplexFunctions: false
			},
			lib: {
				src: [
					"src/**/*.js"
				]
			},
			tests: {
				src: [
					"tests/runner.js",
					"tests/karma/runner.js",
					"tests/spec/**/*.js"
				]
			}
		},
		karma: {
			options: {
				configFile: "karma.conf.js"
			},
			local: {},
			watch: {
				singleRun: false,
				background: true
			},
			phantom: {
				browsers: [
					"PhantomJS"
				],
				preprocessors: {
					"src/**/*js": [
						"coverage"
					]
				},
				reporters: [
					"dots",
					"coverage"
				],
				coverageReporter: {
					type: "lcov",
					dir: "coverage"
				}
			},
			coverage: {
				preprocessors: {
					"src/**/*.js": [
						"coverage"
					]
				},
				reporters: [
					"progress",
					"coverage"
				],
				coverageReporter: {
					type: "html",
					dir: "coverage"
				}
			},
			sauce: {
				reporters: [
					"dots",
					"saucelabs"
				],
				browsers: [
					"sauce_chrome",
					"sauce_firefox",
					"sauce_ie_8",
					"sauce_safari",
					"sauce_ie_11"
				],
				captureTimeout: 120000
			}
		},
		coveralls: {
			options: {
				debug: true,
				coverage_dir: "coverage",
				recursive: true
			}
		},
		"api-meta": {
			docs: {
				src: ["./src"],
				dest: "./"
			}
		}
	});
}

function loadTasks (grunt) {
	var devDepends = grunt.config("pkg.devDependencies");

	Object.keys(devDepends).forEach(function loadIfGruntPlugin (name) {
		if (hasGruntPrefix(name)) {
			grunt.loadNpmTasks(name);
		}
	});
}

function hasGruntPrefix (name) {
	return name.indexOf("grunt-") === 0;
}