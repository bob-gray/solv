Solv
====

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


Design Goals
------------

Solv strives to be as simple and robust in its implementation as possible.
Code quality is important. Clean, obvious code is more valuable than clever,
obfuscated code accompanied by verbose comments. Comments are only present in
Solv when all attempts to refactor for clarity have failed. Developer
productivity is valued over premature optimization. A pleasing API is important
to make using Solv easy and fun.


Prototypes
----------

Solv augments native prototypes to provide the best possible API. There are
risks when altering native prototypes. Native prototypes are global and
collision with other code or future native APIs is possible. On the other hand
the clarity of many operations is greatly enhanced in the context of
object-oriented programming making augmenting native prototypes very attractive. 


Tests
-----

Solv has a fairly extensive test suite that is continuing to grow. To run tests
[Node.js](http://nodejs.org) and [npm](https://npmjs.org) must be installed and
a couple sets of commands need to be run.

###Run from Command Line
  
1. Run `npm install -g grunt-cli` to install grunt command line interface
2. Run `npm install` to install test dependencies

When the above steps are complete, run `grunt test` to execute tests in
PhantomJS.

*See Gruntfile for more test options including running tests and linting on
file change.*

###Run in Browser

1. Run `npm install -g bower` to install bower 
2. Run `bower install` to install test dependencies

When the above steps are completed open `tests/index.html` in the browser of your choice.


Meta
----

Solv is being developed in conjunction with
[meta-json](https://github.com/bob-gray/meta-json) and
[api-meta](https://github.com/bob-gray/api-meta), projects advocating the use
of meta data declared as JSON. This meta data can then drive runtime behavior and be
parsed statically for documentation generation. Solv includes a `meta` runtime
implementation that is meta-json compliant and many of the methods contained
in Solv accept options object comforming to api-meta. Building application with Solv and
declaring options with `meta` means documenations is tied directly to
implementation. meta-json and api-meta are still works in progress as is Solv.
Stay tuned.
