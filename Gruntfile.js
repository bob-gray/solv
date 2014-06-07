"use strict";

module.exports = function (grunt) {
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

	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-karma");
	grunt.loadNpmTasks("grunt-karma-coveralls");
	grunt.loadNpmTasks("grunt-api-meta");

	grunt.registerTask("default", [
		"lint",
		"test"
	]);

	grunt.registerTask("build", [
		"lint",
		"test",
		"coveralls"
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
};