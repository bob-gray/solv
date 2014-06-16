"use strict";

var jasmineEnv = jasmine.getEnv(),
	jsReporter = new jasmine.JSReporter();

jasmineEnv.addReporter(jsReporter);