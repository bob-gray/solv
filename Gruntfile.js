module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			files: [
				"src/**/*.js",
				"tests/spec/**/*.js"
			],
			tasks: [
				//"lint",
				"karma:watch:run"
			]
		},
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
					define: true, // amdefine
					require: false,
					module: false,
					setTimeout: false
				}
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
						beforeEach: false,
						afterEach: false,
						it: false,
						expect: false,
						__karma__: false
					}
				}
			}
		},
		karma: {
			options: {
				files: [{
					pattern: "src/**/*.js",
					included: false
				}, {
					pattern: "tests/spec/**/*-test.js",
					included: false
				}, "tests/karma/runner.js"],
				frameworks: [
					"jasmine",
					"requirejs"
				]
			},
			watch: {
				browsers: [
					"PhantomJS"
				],
				hostname: process.env.IP,
				port: process.env.PORT,
				runnerPort: 0,
				background: true
			},
			phantom: {
				browsers: [
					"PhantomJS"
				],
				hostname: process.env.IP,
				port: process.env.PORT,
				runnerPort: 0,
				singleRun: true
			},
			coverage: {
				browsers: [
					//"Chrome",
					//"Firefox",
					//"IE",
					//"Safari",
					"PhantomJS"
                ],
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
					dir: "tests/coverage/"
				},
				hostname: process.env.IP,
				port: process.env.PORT,
				runnerPort: 0,
				singleRun: true
			}
		},
		dependo: {
			targetPath: "src",
			outputPath: "docs/deps",
			format: "amd"
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-karma");
	grunt.loadNpmTasks("grunt-dependo");

	grunt.registerTask("default", [
		"lint",
		"test"
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
	
	grunt.registerTask("startWatch", [
		"karma:watch:start",
		"watch"
	]);
};