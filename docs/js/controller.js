require(
	[
		"util/js/solv/documentation"
	],
	function (Documentation) {
		var app = new Documentation("../array.js");
		
		app.getDocumentation(function (docs) {
			Docs = docs;
			console.log(docs);
		});
	}
);
