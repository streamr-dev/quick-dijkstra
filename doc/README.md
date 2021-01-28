# quick-dijkstra

quick-dijkstra implements the Dijkstra's algorithm as a native C++ library for NodeJS. Speed tests
indicate that 10x faster than the js-graph-algorithms Dijkstra implementation written in pure Javascript. 

## Installation

The native gets compiled automatically with npm install

```
npm install
```

## Usage from Javascript

```
const QuickDijkstra = require('quick-dijkstra');
let result = QuickDijkstra.calculateShortestPaths([ [0,1,1], [1,2,1], [2,3,1], [3,4,1] ] );
console.log(JSON.stringify(result));
```

## Usage from typescript

```
import * as QuickDijkstra from 'quick-dijkstra';

let result = QuickDijkstra.calculateShortestPaths([ [2,3,1], [0,2,3], [2,1,4] ]);
console.log(JSON.stringify(result));
```

## Api documentation

[Api documentation](doc/modules.md)

## Running the unit test

```
npm test
```

## Running the speed test

Runs a speed test against a pure JS Dijkstra implementation of js-graph-algorithms.

```
npm run speedtest
```

## Acknowledgments

The C++ algorithm was inspired by the GeeksforGeeks tutorial by Shubham Agrawal https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-using-priority_queue-stl and the Dijkstra's implementation posted by Michal Forišek
at https://www.quora.com/What-is-the-most-simple-efficient-C++-code-for-Dijkstras-shortest-path-algorithm
