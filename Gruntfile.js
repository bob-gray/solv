module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jshint: {
			options: {
				"curly": true,
				"eqeqeq": true,
				"forin": true,
				"immed": true,
				"latedef": true,
				"newcap": true,
				"noarg": true,
				"quotmark": true,
				"undef": true,
				"trailing": true,
				"globals": {
					"require": false,
					"define": false,
					"module": true,
					"describe": false,
					"it": false,
					"expect": false,
					"__karma__": false
				}
			}/*,
			all: [
				"*.js",
				"test/karma.runner.js",
				"test/*.test.js"
			]*/
		}//,
		/*karma: {
			unit: {
				configFile: "test/karma.config.js",
				singleRun: true
			}
		},*/
		/*requirejs: {
			compile: {
				options: {
					name: "controller",
					out: "build/optimized.js",
					optimize: "uglify2",
					wrap: {
						start: "/*! <%= pkg.name %> - v<%= pkg.version %> - "+
							"<%= grunt.template.today('yyyy-mm-dd') %> *\/",
						end: "\n"
					}
				}
			}
		}*/
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	//grunt.loadNpmTasks("grunt-karma");
	//grunt.loadNpmTasks("grunt-contrib-requirejs");

	grunt.registerTask("default", [
		"jshint",
		//"karma",
		//"requirejs"
	]);
};