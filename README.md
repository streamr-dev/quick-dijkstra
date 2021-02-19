# quick-dijkstra

quick-dijkstra implements the Dijkstra's algorithm as a native C++ library for NodeJS, and as a 
WebAssembly library for the browsers. Speed tests indicate that the native NodeJS library is approximately 10x faster than the js-graph-algorithms Dijkstra implementation written in pure Javascript. The native NodeJS library is distributed as NPM package @streamr/quick-dijkstra, 
and the WebAssembly version as @streamr/quick-dijkstra-webassembly. Both versions are build from the same codebase (https://github.com/streamr-dev/quick-dijkstra) 

## NodeJS native library

### Installation

The native library gets compiled automatically with npm install

```
npm install @streamr/quick-dijkstra
```

### Usage from Javascript

```
const QuickDijkstra = require('quick-dijkstra');
let result = QuickDijkstra.calculateShortestPaths([ [0,1,1], [1,2,1], [2,3,1], [3,4,1] ] );
console.log(JSON.stringify(result));
```

### Usage from TypeScript 

```
import * as QuickDijkstra from 'quick-dijkstra';

let result = QuickDijkstra.calculateShortestPaths([ [2,3,1], [0,2,3], [2,1,4] ]);
console.log(JSON.stringify(result));
```

### Complete usage example

See the examples/native for a complete example of using the native NodeJS library.

### Running the unit test

```
npm test
```

### Running the speed test

Runs a speed test against a pure JS Dijkstra implementation of js-graph-algorithms.

```
npm run speedtest
```

### Api documentation

[Api documentation](doc/native/modules.md)


## WebAssembly library

### Installation

```
npm install @streamr/quick-dijkstra-wasm
```

### Compiling

Pre-compiled WebAssembly files are provided in the NPM package, so compiling the webassembly library
is not strictly necessary.

If you wish to compile the webassembly files, first download and install the [Emscripten toolkit](https://emscripten.org/docs/getting_started/downloads.html)

Then you can compile the webassembly library by issuing the commands

```
git clone https://github.com/streamr-dev/quick-dijkstra
cd quick-dijkstra
npm install
npm run npm run wasm-compile
```

### Running the speed test

```
npm run wasm-speedtest
```

### Usage on web with a script tag

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
See the complete [example](examples/wasm/javascript-web) at examples/wasm/javascript-web


### Complete Usage examples

The folder examples/wasm contains complete examples of using the WebAssembly library in various environments: 
 * javascript-node is an example of using the WebAssembly library on NodeJS with JavaScript
 * typescript-node is an example of using the WebAssembly library on NodeJS with TypeScript
 * javascript-web is an example of using the WebAssembly library imported using the script tag on web
 * typescript-webpack is an example of using the WebAssembly library in a TypeScript project with webpack
 
The most complete example is the typescript-webpackit, as it includes an example of converting a network graph into the format 
required by the library. Pay attention to the webpack.config.js file; custom rules are neede in order to use the
WebAssembly library in a WebPack project. Also note that the .wasm file needs to be served by the web server from the same folder together with 
the bundled JavaScript file.

### Api documentation

[Api documentation](doc/wasm/modules.md)

## Acknowledgments

The C++ algorithm was inspired by the GeeksforGeeks tutorial by Shubham Agrawal https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-using-priority_queue-stl and the Dijkstra's implementation posted by Michal Forišek
at https://www.quora.com/What-is-the-most-simple-efficient-C++-code-for-Dijkstras-shortest-path-algorithm
