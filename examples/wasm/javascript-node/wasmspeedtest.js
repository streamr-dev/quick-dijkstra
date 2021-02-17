const QuickDijkstraWasm = require("@streamr/quick-dijkstra-wasm");
const TestHelper = require("./testhelper");
const data = TestHelper.loadTopology("./512topology.json");

const NUM_ITERATIONS = 10;

console.log("Speed test of QuickDijkstraWasm");
console.log("Running QuickDijkstraWasm " + NUM_ITERATIONS +" times on a topology of 512 nodes");

let recurseWasm = function(index, callback) 
	{
	QuickDijkstraWasm.calculateShortestPaths(data, ret => 
		{
		console.log(".");	
		//console.log(JSON.stringify(ret)); 
		
		if (index < NUM_ITERATIONS)
			return recurseWasm(index+1, callback);
		else
			return callback();
		});		
	};

let quickDijkstraWasmStart = Date.now();	
recurseWasm(0, ()=> 
	{
	let quickDijkstraWasmEnd = Date.now();	
	let quickDijkstraWasmDuration = quickDijkstraWasmEnd - quickDijkstraWasmStart;
	console.log("On the average, running QuickDijkstraWasm once on a toology of 512 nodes took: " + (quickDijkstraWasmDuration/NUM_ITERATIONS) +" ms");
	});
