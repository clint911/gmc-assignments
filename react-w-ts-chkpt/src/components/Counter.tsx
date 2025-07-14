
// src/components/Counter.tsx

import React, { useState } from 'react';

// Define the props interface for the Counter component.
// In this case, there are no props, so it's an empty interface.
interface CounterProps {}

// The Counter component is a functional component with its own state.
// The state 'count' is typed as a number.
const Counter: React.FC<CounterProps> = () => {
  const [count, setCount] = useState<number>(0);

  // The increment and decrement functions are typed to ensure they don't take any arguments
  // and return void.
  const increment = (): void => {
    setCount(count + 1);
  };

  const decrement = (): void => {
    setCount(count - 1);
  };

  return (
    <div className="counter-container">
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <div className="buttons-container">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
