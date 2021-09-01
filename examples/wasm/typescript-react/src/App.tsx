import React from 'react';
import './App.css';
import * as QuickDijkstraWasm from '@streamr/quick-dijkstra-wasm';

function getShortestPaths() {

  console.log("running recursion 1");
  QuickDijkstraWasm.calculateShortestPaths([ [2,3,1], [0,2,3], [2,1,4] ], ret => 
	  {
    console.log("recursion 1 result" + JSON.stringify(ret));
  
    console.log("running recursion 2 (contains disjoint edges)");
    QuickDijkstraWasm.calculateShortestPaths([ [2,3,5], [0,2,8], [2,1,9], [5,6,1] ], ret2 => 
      {
      console.log("recursion 2 result" + JSON.stringify(ret2));
      });
    });

  }  

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getShortestPaths}>
          Run QuickDijkstra (results shown in console)
        </button>
      </header>
    </div>
  );
}

export default App;
