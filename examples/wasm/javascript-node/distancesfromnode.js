const QuickDijkstraWasm = require("@streamr/quick-dijkstra-wasm");
//QuickDijkstraWasm = require("../../../wasmdist");
const TestHelper = require("./testhelper");
const data = TestHelper.loadTopology("./512topology.json");

console.log("Using QuickDijkstraWasm to calculate the distances from a single node to all other nodes in a topology of 512 nodes");


QuickDijkstraWasm.calculateShortestPathsFromNode(data, 5, (ret) =>
	{
	console.log(JSON.stringify(ret)); 
	});


	

