import * as QuickDijkstraWasm from "@streamr/quick-dijkstra-wasm";


QuickDijkstraWasm.calculateShortestPaths( [[0, 1, 20], [1,2,10], [2,0,5] ], (result) => 
	{
	console.log(JSON.stringify(result));
		
	QuickDijkstraWasm.calculateShortestPathsFromNode( [[0, 1, 20], [1,2,10], [2,0,5] ], 0, (result2) => 
		{
		console.log(JSON.stringify(result2));
		});
	});	

