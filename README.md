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

To run tests [Node.js][http://nodejs.org] and [npm][https://npmjs.org] must be
installed and a couple set commands need to be run.

###Command Line

**Set up**
  
1. Run `npm install -g grunt-cli` to install grunt command line interface
2. Run `npm install` to install test dependencies

Once set up is complete run `grunt test` to execute tests in PhantomJS.

*See the Gruntfile for more test options including running tests and lint on
file change.*

###Browser

**Set up**

1. Run `npm install -g bower` to install bower 
2. Run `bower install` to install test dependencies

Once set up is complete open `tests/index.html` in the browser of your choice.
