/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function (require) {
	"use strict";

	require("../abstract/base");
	require("../array/shim");
	require("../function/shim");
	require("../function/constrict");
	require("../array/copy");
	require("../array/empty");
	require("../array/add");
	require("../array/remove");
	require("../array/replace");

	var meta = require("../meta"),
		createClass = require("../class/create"),
		Bundle;

	meta.setRequire(require);

	Bundle = createClass(
		meta({
			"name": "Bundle",
			"type": "class",
			"extends": "../abstract/base",
			"description": "A set of objects",
			"arguments": [{
				"name": "identity",
				"type": "string",
				"default": "id",
				"description": "Name of the identity property of the items to be stored in the bundle."
			}, {
				"name": "items",
				"type": "array",
				"default": [],
				"description": "Initial items of the bundle."
			}]
		}),
		init
	);

	Bundle.method(
		meta({
			"name": "get",
			"description": "Gets an item by it's id. Items are stored directly on the bundle and can alternately be accessed directly with bracket or dot notations. Such as bundle[id] or bundle.someId",
			"arguments": [{
				"name": "id",
				"type": "string|number"
			}],
			"returns": {
				"name": "item",
				"type": "object|undefined"
			}
		}),
		get
	);

	Bundle.method(
		meta({
			"name": "add",
			"description": "Adds item to the bundle. Overrides exisitng item of the same id.",
			"arguments": [{
				"name": "item",
				"type": "object"
			}],
			"returns": {
				"name": "bundle",
				"type": "object"
			}
		}),
		add
	);

	Bundle.method(
		meta({
			"name": "remove",
			"description": "Removes and returns an item from the bundle.",
			"arguments": [{
				"name": "identity",
				"type": "string|number"
			}],
			"returns": {
				"name": "item",
				"type": "object|undefined",
				"description": "undefined if item is not included in the bundle."
			}
		}),
		remove
	);

	Bundle.method(
		meta({
			"name": "empty",
			"description": "Removes all items from the bundle.",
			"arguments": [],
			"returns": {
				"name": "bundle",
				"type": "object"
			}
		}),
		empty
	);

	Bundle.method(
		meta({
			"name": "includes",
			"description": "Determines whether an item with a given id is contained in the bundle.",
			"arguments": [{
				"name": "id",
				"type": "string|number"
			}],
			"returns": "boolean"
		}),
		includes
	);

	Bundle.method(
		meta({
			"name": "excludes",
			"description": "Determines whether an item with a given id is not contained in the bundle.",
			"arguments": [{
				"name": "id",
				"type": "string|number"
			}],
			"returns": "boolean"
		}),
		excludes
	);

	Bundle.method(
		meta({
			"name": "isEmpty",
			"description": "Returns true if a bundle contains no items.",
			"arguments": [],
			"returns": "boolean"
		}),
		isEmpty
	);

	Bundle.method(
		meta({
			"name": "each",
			"description": "Executes callback for each item in the bundle. Callback signature is (item, index, bundle). The this context of the callback is the item.",
			"arguments": [{
				"name": "callback",
				"type": "function"
			}]
		}),
		each
	);

	Bundle.method(
		meta({
			"name": "map",
			"description": "Executes callback for each item in the bundle and creates an array of the return values. Callback signature is (item, index, bundle). The this context of the callback is the item.",
			"arguments": [{
				"name": "callback",
				"type": "function"
			}],
			"returns": "array"
		}),
		map
	);

	Bundle.method(
		meta({
			"name": "filter",
			"description": "Executes callback for each item in the bundle and creates a new bundle including the items for which callback returns true. Callback signature is (item, index, bundle). The this context of the callback is the item.",
			"arguments": [{
				"name": "callback",
				"type": "function"
			}],
			"returns": {
				"name": "bundle",
				"type": "object",
				"description": "a new bundle."
			}
		}),
		filter
	);

	Bundle.method(
		meta({
			"name": "every",
			"description": "Executes callback for each item in the bundle or until callback returns a falsy value. Callback signature is (item, index, bundle). The this context of the callback is the item.",
			"arguments": [{
				"name": "callback",
				"type": "function"
			}],
			"returns": {
				"type": "boolean",
				"description": "true unless callback returns a falsy value."
			}
		}),
		every
	);

	Bundle.method(
		meta({
			"name": "some",
			"description": "Executes callback for each item in the bundle or until callback returns a truthy value. Callback signature is (item, index, bundle). The this context of the callback is the item.",
			"arguments": [{
				"name": "callback",
				"type": "function"
			}],
			"returns": {
				"type": "boolean",
				"description": "false unless callback returns a truthy value."
			}
		}),
		some
	);

	Bundle.method(
		meta({
			"name": "reduce",
			"description": "Executes callback for each item in the bundle to act as an accumulator. Callback signature is (reducedValue, item, index, bundle). The this context of the callback is the item.",
			"arguments": [{
				"name": "callback",
				"type": "function"
			}, {
				"name": "initialValue",
				"type": "any",
				"required": false
			}],
			"returns": "any"
		}),
		reduce
	);

	Bundle.method(
		meta({
			"name": "sort",
			"description": "Delegates to the native sort method of the internal catalog array. Items will be iterated in this order with subsequent calls to each, map, some, every, filter, etc. Items added after the sort will be added to the bottom.",
			"arguments": [{
				"name": "compare",
				"type": "function"
			}],
			"returns": {
				"name": "bundle",
				"type": "object"
			}
		}),
		sort
	);

	Bundle.method(
		meta({
			"name": "reverse",
			"description": "Delegates to the native reverse method of the internal catalog array. Reverses the order the items will be iterated over.",
			"arguments": [],
			"returns": {
				"name": "bundle",
				"type": "object"
			}
		}),
		reverse
	);

	Bundle.method(
		meta({
			"name": "getLength",
			"arguments": [],
			"returns": {
				"type": "number",
				"description": "number of items in bundle."
			}
		}),
		getLength
	);

	Bundle.method(
		meta({
			"name": "toArray",
			"description": "Returns items as native array.",
			"arguments": [],
			"returns": "array"
		}),
		toArray
	);

	Bundle.method(
		meta({
			"name": "toJSON",
			"arguments": [],
			"returns": "array"
		}),
		toArray
	);

	Bundle.method(
		meta({
			"name": "ascending",
			"static": true,
			"description": "Compares two items by their identity.",
			"arguments": [{
				"name": "a",
				"type": "object",
				"description": "item in bundle"
			}, {
				"name": "b",
				"type": "object",
				"description": "other item in bundle"
			}],
			"returns": {
				"type": "number",
				"description": "-1 if a's identity is less than b and 1 if greater."
			}
		}),
		ascending
	);

	Bundle.method(
		meta({
			"name": "descending",
			"static": true,
			"description": "Compares two items by their identity.",
			"arguments": [{
				"name": "a",
				"type": "object",
				"description": "item in bundle"
			}, {
				"name": "b",
				"type": "object",
				"description": "other item in bundle"
			}],
			"returns": {
				"type": "number",
				"description": "1 if a's identity is less than b and -1 if greater."
			}
		}),
		descending
	);

	function init (identity, items) {
		this.identity = identity;
		this.catalog = [];
		items.forEach(this.add.bind(this).constrict(0, 1));
	}

	function get (id) {
		return this[id];
	}

	function add (item) {
		var id = item[this.identity],
			existing = this[id];

		if (existing) {
			this.catalog.replace(existing, item);
		} else {
			this.catalog.add(item);
		}

		this[id] = item;

		return this;
	}

	function remove (id) {
		var item = this[id];

		this.catalog.remove(item);
		delete this[id];

		return item;
	}

	function empty () {
		this.catalog.forEach(this.proxy(drop));
		this.catalog.empty();

		return this;
	}

	function drop (item) {
		var id = item[this.identity];

		delete this[id];
	}

	function includes (id) {
		return id in this;
	}

	function excludes (id) {
		return !this.includes(id);
	}

	function isEmpty () {
		return this.getLength() === 0;
	}

	function each (callback) {
		this.catalog.forEach(proxy(this, callback));
	}

	function map (callback) {
		return this.catalog.map(proxy(this, callback));
	}

	function filter (callback) {
		var items = this.catalog.filter(proxy(this, callback));

		return new Bundle(this.identity, items);
	}

	function every (callback) {
		return this.catalog.every(proxy(this, callback));
	}

	function some (callback) {
		return this.catalog.some(proxy(this, callback));
	}

	function proxy (bundle, callback) {
		return function (item, index) {
			return callback.call(item, item, index, bundle);
		};
	}

	function reduce (callback, initialValue) {
		return this.catalog.reduce(reduceProxy(this, callback), initialValue);
	}

	function reduceProxy (bundle, callback) {
		return function (value, item, index) {
			return callback.call(item, value, item, index, bundle);
		};
	}

	function toArray () {
		return this.catalog.copy();
	}

	function getLength () {
		return this.catalog.length;
	}

	function sort (compare) {
		this.catalog.sort(compare.bind(this));

		return this;
	}

	function reverse () {
		this.catalog.reverse();

		return this;
	}

	function ascending (a, b) {
		var identity = this.identity;

		return a[identity] > b[identity] ? 1 : -1;
	}

	function descending (a, b) {
		var identity = this.identity;

		return a[identity] < b[identity] ? 1 : -1;
	}

	return Bundle;
});