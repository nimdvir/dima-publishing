# Chapter 2: Hooks

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

## useState

The `useState` hook lets you add state to a functional component.

```tsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## useEffect

The `useEffect` hook lets you perform side effects in functional components.
