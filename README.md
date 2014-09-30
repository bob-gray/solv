![Solv](https://raw.github.com/bob-gray/solv/v0.8.0/logo/solv-500x200.png)

[![Build Status](https://travis-ci.org/bob-gray/solv.svg?branch=master)](https://travis-ci.org/bob-gray/solv)
[![Code Climate](https://codeclimate.com/github/bob-gray/solv.png)](https://codeclimate.com/github/bob-gray/solv)
[![Sauce Test Status](https://saucelabs.com/buildstatus/solv)](https://saucelabs.com/u/solv)
[![Coverage Status](https://img.shields.io/coveralls/bob-gray/solv.svg)](https://coveralls.io/r/bob-gray/solv)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM version](https://badge.fury.io/js/solv.svg)](http://badge.fury.io/js/solv)
[![Dependency Status](https://david-dm.org/bob-gray/solv.svg)](https://david-dm.org/bob-gray/solv)
[![devDependency Status](https://david-dm.org/bob-gray/solv/dev-status.svg)](https://david-dm.org/bob-gray/solv#info=devDependencies)

[API Documentation](http://bob-gray.github.io/solv/)

Object-Oriented Modular JavaScript Library
------------------------------------------

Solv is a collection of [AMD](http://en.wikipedia.org/wiki/Asynchronous_module_definition)
JavaScript modules built for object-oriented application development. Solv is
very API focused. Solv reduces boilerplate code by handling lots of the plumbing
involved in building class APIs (methods, events and properties). Solv is for
the browser and for [Node.js](http://nodejs.org/). It contains tools for:

  - Creating class hierarchies
  - Class mixins
  - Method overloading
  - Declaring default arguments and properties
  - Type checking arguments and return values
  - Custom events
  - and more... 


Install
-------

The two easiest ways to install solv are [npm](https://npmjs.org) and
[bower](http://bower.io). Solv can also be installed by downloading or cloning
from github. Solv is a modular library and doesn't offer a concatenated file
for distribution. Once Solv is installed each of it's modules can be
pulled in when and where needed.

  - To install into a node project - run `npm install solv`
  - To install into a browser project - run `bower install solv`
  - To get a copy of the source - run `git clone https://github.com/bob-gray/solv.git`


Supported Browsers
------------------

The browsers and platforms represented below are those that are tested as part
of Solv's build.

[![Selenium Test Status](https://saucelabs.com/browser-matrix/solv.svg)](https://saucelabs.com/u/solv)


Design Goals
------------

Solv strives to be as simple and robust in its implementation as possible.
Code quality is important. Clean, obvious code is valued over clever,
obfuscated code accompanied by verbose comments. Comments are only present in
Solv when all attempts to refactor for clarity have failed. Developer
productivity is valued over premature optimization. Solv's API is designed
to be easy and fun to use.


Prototypes
----------

Solv augments native prototypes to provide the best possible API. There are
risks when altering native prototypes. Native prototypes are global and
collision with other code or future native APIs is possible. On the other hand,
member functions enhance the clarity of many operations. This makes augmenting
native prototypes very attractive.


Tests
-----

Solv has a fairly extensive test suite that is continuing to grow. To run tests
[Node.js](http://nodejs.org) and [npm](https://npmjs.org) must be installed and
a couple sets of commands need to be run.

###Test from Command Line
  
1. Run `npm install -g grunt-cli` to install grunt command line interface
2. Run `npm install` to install test dependencies
3. Run `grunt test` to execute test

*See Gruntfile for more test and analysis options.*

###Test in Browser

1. Run `npm install -g bower` to install bower 
2. Run `bower install` to install test dependencies
3. Open `tests/index.html` in the browser of your choice


Meta
----

Solv is being developed in conjunction with
[meta-json](https://github.com/bob-gray/meta-json) and
[api-meta](https://github.com/bob-gray/api-meta), projects advocating the use
of meta data declared as JSON. This meta data can then drive runtime behavior and be
parsed statically for documentation generation. Solv includes a `meta` runtime
implementation that is meta-json compliant and many of the methods contained
in Solv accept options objects comforming to api-meta. Building application with Solv and
declaring options with `meta` means documenations is tied directly to
implementation. meta-json and api-meta are still works in progress as is Solv.
Stay tuned...
