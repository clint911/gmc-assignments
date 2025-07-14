
// src/components/Greeting.tsx

import React from 'react';

// Define the props interface for the Greeting component.
// This ensures that the 'name' prop is always a string.
interface GreetingProps {
  name: string;
}

// The Greeting component is a functional component that takes 'name' as a prop.
// It's typed with React.FC<GreetingProps> to ensure type safety.
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div className="greeting-container">
      <h1>Hello, {name}!</h1>
    </div>
  );
};

export default Greeting;
