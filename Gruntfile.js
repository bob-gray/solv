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
					"progress",
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
					"progress",
					"saucelabs"
				],
				browsers: [
					"sauce_chrome",
					"sauce_firefox",
					"sauce_safari",
					"sauce_ie_11",
					"sauce_ie_8"
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