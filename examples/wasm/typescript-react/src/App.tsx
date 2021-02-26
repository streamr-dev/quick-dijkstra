import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as QuickDijkstraWasm from '@streamr/quick-dijkstra-wasm';

function getShortestPaths() {
  QuickDijkstraWasm.calculateShortestPaths([ [2,3,1], [0,2,3], [2,1,4] ], ret => 
	  {
    console.log(ret);
    })
}  

function App() {
  getShortestPaths();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
