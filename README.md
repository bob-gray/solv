solv
====

Enterprise JavaScript Toolset
-----------------------------

Solv is a collection of AMD JavaScript modules built for enterprise web
application development. Code quality is important. The goal of solv is to be as
simple and robust as possible. Solv has a fairly extensive test suite and soon
to have documentation generated directly from runtime meta data. Solv is a work
in progess and contributions are welcome.

Run Tests
---------

To run test `Node.js` and `npm` must be installed.

###Command Line

**Set up**
  
1. Run `npm install -g grunt-cli` to install grunt command line interface
2. Run `npm install` to install test dependencies

Once set up is complete, run `grunt test` to execute test in PhantomJS.

See the Gruntfile more test options including running test and lint on file
change.

###Browser

**Set up**

1. Run `bower install jasmine requirejs` to install test dependencies

Open `tests/index.html` in the browser of your choice.