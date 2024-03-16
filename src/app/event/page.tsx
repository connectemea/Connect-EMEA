// pages/index.tsx

import React from 'react';


// Define a TypeScript interface for a person
interface Person {
  name: string;
  age: number;
}

// Define a functional component that takes a person as a prop
const PersonDetails: React.FC<{ person: Person }> = ({ person }) => {
  return (
    <div>
      <h2>Name: {person.name}</h2>
      <h2>Age: {person.age}</h2>
    </div>
  );
};

const IndexPage: React.FC = () => {
  // Create a person object
  const person: Person = { name: 'John', age: 30 };

  return (
    <div>
      <h1>TS Demo</h1>
      <PersonDetails person={person} />
    </div>
  );
};

export default IndexPage;
