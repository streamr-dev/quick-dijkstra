const QuickDijkstra = require("../quickdijkstra.js");
const JsGraphDijkstra = require("./jsgraphdijkstra");
const TestHelper = require("./testhelper");

const NUM_ITERATIONS = 10;

const data = TestHelper.loadTopology("./test/512topology.json");

console.log("Speed test of QuickDijkstra");
console.log("Running QuickDijkstra " + NUM_ITERATIONS +" times on a topology of 512 nodes");

let quickDijkstraStart = Date.now();
for (let i = 0; i < NUM_ITERATIONS; i++)
	{
	let quickDijkstraResult = QuickDijkstra.calculateShortestPaths(data);
	console.log(".");	
	}

let quickDijkstraEnd = Date.now();

console.log("Running JsGraphDijkstra " + NUM_ITERATIONS +" times on a topology of 512 nodes");	

let jsDijkstraStart = Date.now();

for (let i = 0; i < NUM_ITERATIONS; i++)
	{
	let jsGraphDijkstraResult = JsGraphDijkstra.calculateShortestPaths(data);
	console.log(".");	
	}

let jsDijkstraEnd = Date.now();

let quickDijkstraDuration = quickDijkstraEnd - quickDijkstraStart;
let jsDijkstraDuration = jsDijkstraEnd - jsDijkstraStart;

console.log("On the average, running QuickDijkstra once on a toology of 512 nodes took: " + (quickDijkstraDuration/10) +" ms");
console.log("On the average, running JsDijkstra once on a toology of 512 nodes took: " + (jsDijkstraDuration/10) +" ms");
console.log("QuickDijkstra was "+ jsDijkstraDuration/quickDijkstraDuration + " times faster");