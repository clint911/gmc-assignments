
import React from 'react';
import Greeting from './components/Greeting';
import Counter from './components/Counter';
import './components/Neobrutalism.css';

function App() {
  return (
    <div className="App">
      <Greeting name="world" />
      <Counter />
    </div>
  );
}

export default App;
