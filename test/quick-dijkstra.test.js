const QuickDijkstra = require("../quickdijkstra.js");
const JsGraphDijkstra = require("./jsgraphdijkstra");
const TestHelper = require("./testhelper");

const beautify = require ("json-beautify");



let simpleJsGraphResult = null;

test('calculates shortest paths in a simple topology using jsgraph', () => {
	simpleJsGraphResult = JsGraphDijkstra.calculateShortestPaths([ [0,1,1], [1,2,1], [2,3,1], [3,4,1] ] );
	//console.log(beautify(simpleJsGraphResult));
});

let simpleQuickDijkstraResult = null;

test('calculates shortest paths in a simple topology using QuickDijkstra', () => {
	simpleQuickDijkstraResult = QuickDijkstra.calculateShortestPaths([ [0,1,1], [1,2,1], [2,3,1], [3,4,1] ] );
	//console.log(beautify(simpleQuickDijkstraResult));
});

test('checks if results of JsGraph and QuickDijkstra are equal for the simple topology', () => {
	expect(TestHelper.areResultsEqual(simpleJsGraphResult,simpleQuickDijkstraResult)).toBeTruthy();
});

let jsGraphResult = null;

test('calculates shortest paths in topology of 512 nodes using jsgraph', () => {
	let data = TestHelper.loadTopology("./test/512topology.json");
	jsGraphResult = JsGraphDijkstra.calculateShortestPaths(data);
	//console.log(beautify(jsGraphResult));
});

let quickDijkstraResult  = null;

test('calculates shortest paths in topology of 512 nodes', () => {
	let data = TestHelper.loadTopology("./test/512topology.json");
	quickDijkstraResult = QuickDijkstra.calculateShortestPaths(data);
	//console.log(beautify(quickDijkstraResult));
});

test('checks if results of JsGraph and QuickDijkstra are equal for the 512 nodes topology', () => {
	expect(TestHelper.areResultsEqual(jsGraphResult,quickDijkstraResult)).toBeTruthy();
});





/*
"maximumDistance":645,"maximumPathHops":23,"longestShortestPath":[32,110,232,242,189,276,355,274,33,39,121,500,469]}
[3,335,436,278,375,81,292,307,308,324,286,287,25,192,127,193,377,387,38,116,506,124,393,122]
*/