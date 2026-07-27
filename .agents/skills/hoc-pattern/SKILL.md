---
name: hoc-pattern
description: Teaches the Higher-Order Component (HOC) pattern for logic reuse. Use when you need to share cross-cutting concerns like authentication, logging, or data fetching across multiple components.
paths:
  - "**/*.tsx"
  - "**/*.jsx"
license: MIT
metadata:
  author: patterns.dev
  version: "1.1"
related_skills:
  - "hooks-pattern"
  - "render-props-pattern"
---

# HOC Pattern

## Table of Contents

- [When to Use](#when-to-use)
- [When NOT to Use](#when-not-to-use)
- [Instructions](#instructions)
- [Details](#details)
- [Source](#source)

Within our application, we often want to use the same logic in multiple components. One way of being able to reuse the same logic in multiple components, is by using the **higher order component** pattern. This pattern allows us to reuse component logic throughout our application.

## When to Use

- Use this when the same uncustomized behavior needs to be applied to many components
- This is helpful when a component should work standalone without the added custom logic

## When NOT to Use

- When custom hooks can achieve the same result with less nesting and better readability
- In new React 18+ code where hooks are the idiomatic approach to sharing stateful logic
- When the HOC wrapper adds prop-name collisions or obscures the component tree in DevTools

## Instructions

- Create a function that takes a component and returns a new component with enhanced behavior
- Avoid naming collisions by renaming or merging props in the HOC
- Prefer React Hooks over HOCs for most new code to avoid wrapper hell and deep nesting
- Compose multiple HOCs carefully and be aware that the order of composition matters

## Details

A Higher Order Component (HOC) is a component that receives another component. The HOC contains certain logic that we want to apply to the component that we pass as a parameter. After applying that logic, the HOC returns the element with the additional logic.

### Example: `withStyles`

```js
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () => <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```

### Example: `withLoader`

```js
function withLoader(Element, url) {
  return (props) => {};
}
```

### Composing HOCs

We can also compose multiple Higher Order Components. However, this can lead to deeply nested component trees:

```js
<withAuth>
  <withLayout>
    <withLogging>
      <Component />
    </withLogging>
  </withLayout>
</withAuth>
```

### Hooks vs HOCs

In some cases, we can replace the HOC pattern with React Hooks. Generally, React Hooks don't replace the HOC pattern but can reduce nesting:

- **Best use-cases for HOCs**: same uncustomized behavior needed by many components; component works standalone without the added logic
- **Best use-cases for Hooks**: behavior customized per component; few components use it; behavior adds many properties

### Pros

- Keeps reusable logic in one place (DRY)
- Enforces separation of concerns

### Cons

- Prop name collisions (mitigate by merging props)
- Wrapper hell with multiple composed HOCs
- Difficult to trace which HOC provides which prop

## Source

- [patterns.dev/react/hoc-pattern](https://patterns.dev/react/hoc-pattern)
