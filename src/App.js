import React from 'react';
import './App.css';

import Barchart from "./bar-charts";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> Recharts: Barchart</p>
        <a href="#barChart"> ▼ </a>
      </header>
      <div id="barChart"></div>
      <Barchart />
    </div>
  );
}

export default App;
