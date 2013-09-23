module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jshint: {
			options: {
				strict: true,
				curly: true,
				eqeqeq: true,
				forin: true,
				immed: true,
				latedef: "nofunc",
				newcap: true,
				noarg: true,
				noempty: true,
				nonew: true,
				plusplus: true,
				quotmark: true,
				undef: true,
				validthis: true,
				maxparams: 3,
				maxdepth: 2,
				//maxstatements: 5,
				maxcomplexity: 5,
				globals: {
					require: false,
					define: false
				},
				ignores: [
					"src/meta/parser.js"
				]
			},
			src: [
				"src/**/*.js"
			],
			tests: {
				files: {
					src: [
						"tests/runner.js",
						"tests/karma/runner.js",
						"tests/spec/**/*.js"
					]
				},
				options: {
					globals: {
						require: false,
						define: false,
						jasmine: false,
						describe: false,
						it: false,
						expect: false,
						__karma__: false
					}
				}
			}
		},
		karma: {
			unit: {
				options: {
					files: [{
						pattern: "src/**/*.js",
						included: false
					}, {
						pattern: "tests/spec/**/*-test.js",
						included: false
					}, "tests/karma/runner.js"],
					browsers: [
						"Chrome",
						"Firefox",
						"IE",
						"Safari",
						"PhantomJS"
					],
					frameworks: [
						"jasmine",
						"requirejs"
					],
					singleRun: true
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-karma");

	grunt.registerTask("default", [
		"jshint",
		"karma"
	]);
};