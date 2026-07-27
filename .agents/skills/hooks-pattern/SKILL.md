---
name: hooks-pattern
description: Teaches React Hooks for reusing stateful logic across components. Use when extracting shared behavior like form handling, subscriptions, or side effects into reusable custom hooks.
context: fork
allowed-tools: Read, Grep, Glob
paths:
  - "**/*.tsx"
  - "**/*.jsx"
license: MIT
metadata:
  author: patterns.dev
  version: "1.1"
related_skills:
  - "hoc-pattern"
  - "render-props-pattern"
---

# Hooks Pattern

## Table of Contents

- [When to Use](#when-to-use)
- [Instructions](#instructions)
- [Details](#details)
- [Source](#source)

React 16.8 introduced a new feature called [**Hooks**](https://react.dev/reference/react/hooks). Hooks make it possible to use React state and lifecycle methods, without having to use an ES2015 class component.

Although Hooks are not necessarily a design pattern, Hooks play a very important role in your application design. Many traditional design patterns can be replaced by Hooks.

## When to Use

- Use this when you need to add state or lifecycle behavior to functional components
- This is helpful for extracting and reusing stateful logic across multiple components
- Use this instead of class components for cleaner, more composable code

## Instructions

- Use `useState` for local state and `useEffect` for side effects in functional components
- Create custom hooks (prefixed with `use`) to encapsulate and share reusable logic
- Follow the Rules of Hooks: only call hooks at the top level and only in React functions
- Avoid unnecessary `useEffect` — compute derived state directly in the component body
- Let the React Compiler handle memoization instead of manual `useMemo`/`useCallback` where possible

## Details

### Class components

Before Hooks were introduced in React, we had to use class components in order to add state and lifecycle methods to components. A typical class component in React can look something like:

```js
class MyComponent extends React.Component {
  /* Adding state and binding custom methods */
  constructor() {
    super()
    this.state = { ... }

    this.customMethodOne = this.customMethodOne.bind(this)
    this.customMethodTwo = this.customMethodTwo.bind(this)
  }

  /* Lifecycle Methods */
  componentDidMount() { ...}
  componentWillUnmount() { ... }

  /* Custom methods */
  customMethodOne() { ... }
  customMethodTwo() { ... }

  render() { return { ... }}
}
```

A class component can contain a state in its constructor, lifecycle methods such as `componentDidMount` and `componentWillUnmount` to perform side effects based on a component's lifecycle, and custom methods to add extra logic to a class.

Although we can still use class components after the introduction of React Hooks, using class components can have some downsides! Let's look at some of the most common issues when using class components.

### State Hook

React provides a hook that manages state within a functional component, called `useState`.

```js
function Input() {
  const [input, setInput] = React.useState("");

  return <input onChange={(e) => setInput(e.target.value)} value={input} />;
}
```

### Effect Hook

With the `useEffect` hook, we can _"hook into"_ a components lifecycle. The `useEffect` hook effectively combines the `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` lifecycle methods.

### Custom Hooks

Besides the built-in hooks that React provides, we can easily create our own custom hooks.

```js
function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);

  function handleDown({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  function handleUp({ key }) {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  return keyPressed;
}
```

### Additional Hooks

- **useState** — manage local state in function components
- **useEffect** — side effects (data fetching, subscriptions, DOM manipulation)
- **useContext** — consume React context without nesting
- **useReducer** — complex state logic with reducer pattern

## Source

- [patterns.dev/react/hooks-pattern](https://patterns.dev/react/hooks-pattern)
