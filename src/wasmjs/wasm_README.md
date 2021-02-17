# @streamr/quick-dijkstra-wasm

@streamr/quick-dijkstra-wasm implements the Dijkstra's algorithm as a WebAssembly library. 

## Installation

```
npm install @streamr/quick-dijkstra-wasm
```

## Usage from typescript

import * as QuickDijkstraWasm from "@streamr/quick-dijkstra-wasm";

QuickDijkstraWasm.calculateShortestPaths([ [ 0, 1, 5 ], [ 1, 2, 60 ] ], (result) => 
	{
	console.log(JSON.stringify(result));	
	});

## Usage on web page with traditional Javascript

```
<script src="dijkstraengine.js"></script>
<script src="quickdijkstra-wasm.js"></script>

...

<script>

QuickDijkstraWasm.calculateShortestPaths([ [2,3,1], [0,2,3], [2,1,4] ], ret => 
	{
	console.log(ret);
	}	

</script>

```

See the complete [example](https://github.com/streamr-dev/quick-dijkstra/tree/master/examples/wasm) at GitHub

## Api documentation

[Api documentation](https://github.com/streamr-dev/quick-dijkstra/blob/master/doc/wasm/modules.md)

## Acknowledgments

The C++ algorithm was inspired by the GeeksforGeeks tutorial by Shubham Agrawal https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-using-priority_queue-stl and the Dijkstra's implementation posted by Michal Forišek
at https://www.quora.com/What-is-the-most-simple-efficient-C++-code-for-Dijkstras-shortest-path-algorithm
