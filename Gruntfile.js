module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jshint: {
			options: {
				"strict": true,
				"curly": true,
				"eqeqeq": true,
				"forin": true,
				"immed": true,
				"latedef": "nofunc",
				"newcap": true,
				"noarg": true,
				"noempty": true,
				"nonew": true,
				"plusplus": true,
				"quotmark": true,
				"undef": true,
				"validthis": true,
				"maxparams": 3,
				"maxdepth": 2,
				"maxcomplexity": 5,
				"globals": {
					"require": false,
					"define": false
				},
				ignores: [
					"src/meta/parser.js"
				]
			},
			use_defaults: [
				"src/**/*.js"
			]
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.registerTask("default", [
		"jshint"
	]);
};