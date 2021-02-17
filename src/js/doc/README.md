quick-dijkstra / [Exports](modules.md)

# quick-dijkstra

quick-dijkstra implements the Dijkstra's algorithm as a native C++ library for NodeJS, and as a 
WebAssembly library for the browsers. Speed tests indicate that the native NodeJS library is 10x faster than the js-graph-algorithms Dijkstra implementation written in pure Javascript. 

## Installation (NodeJS native library)

The native library gets compiled automatically with npm install

```
npm install
```

## Usage from Javascript (NodeJS native library)

```
const QuickDijkstra = require('quick-dijkstra');
let result = QuickDijkstra.calculateShortestPaths([ [0,1,1], [1,2,1], [2,3,1], [3,4,1] ] );
console.log(JSON.stringify(result));
```

## Usage from typescript (NodeJS native library)

```
import * as QuickDijkstra from 'quick-dijkstra';

let result = QuickDijkstra.calculateShortestPaths([ [2,3,1], [0,2,3], [2,1,4] ]);
console.log(JSON.stringify(result));
```

## Running the unit test (NodeJS native library)

```
npm test
```

## Running the speed test (NodeJS native library)

Runs a speed test against a pure JS Dijkstra implementation of js-graph-algorithms.

```
npm run speedtest
```

## Compiling (WebAssembly library)

Pre-compiled webassembly files are provided with the source code, so compiling the webassembly library
is not strictly necessary.

If you wish to compile the webassembly files, first download and install the [Emscripten toolkit](https://emscripten.org/docs/getting_started/downloads.html)

Then you can compile the webassembly library by issuing the commands

```
npm install
npm run npm run webassembly-compile
```

## Running the speed test (WebAssembly library on NodeJS)

```
npm run webassembly-speedtest
```

## Running the speed test (WebAssembly on browser)

Serve the "examples" folder using a web server, and open the "index.html" in a web browser. 
On MAC you can start a simple web server with the commands

```
cd examples
python -m SimpleHTTPServer
```

## Usage on web browser (WebAssembly library with traditional Javascript)

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

See the complete [example](examples/index.html) at examples/index.html

## Api documentation

[Api documentation](doc/modules.md)

## Acknowledgments

The C++ algorithm was inspired by the GeeksforGeeks tutorial by Shubham Agrawal https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-using-priority_queue-stl and the Dijkstra's implementation posted by Michal Forišek
at https://www.quora.com/What-is-the-most-simple-efficient-C++-code-for-Dijkstras-shortest-path-algorithm
