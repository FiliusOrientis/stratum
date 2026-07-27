---
name: render-props-pattern
description: Teaches the render props pattern for flexible component composition. Use when you need to share rendering logic between components by passing a function that returns JSX as a prop.
paths:
  - "**/*.tsx"
  - "**/*.jsx"
license: MIT
metadata:
  author: patterns.dev
  version: "1.1"
related_skills:
  - "hooks-pattern"
  - "hoc-pattern"
---

# Render Props Pattern

## When to Use

- Use when you need to share stateful logic between components with different rendering needs
- Use when the HOC pattern creates naming collision issues or overly deep nesting

## When NOT to Use

- When custom hooks can replace the pattern
- When it creates deeply nested JSX that becomes hard to read and maintain

## Instructions

- Pass a function as a `render` prop (or `children` prop) that receives data and returns JSX
- Prefer custom Hooks over render props in most modern React code
- Use the children-as-a-function pattern as a cleaner alternative to explicit `render` props
- Avoid deeply nesting multiple render prop components — refactor to Hooks instead

## Example

```js
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.render(value)}
    </>
  );
}

function App() {
  return (
    <Input
      render={(value) => (
        <>
          <Kelvin value={value} />
          <Fahrenheit value={value} />
        </>
      )}
    />
  );
}
```

### Children as a function

```js
<Input>
  {(value) => (
    <>
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </>
  )}
</Input>
```

## Source

- [patterns.dev/react/render-props-pattern](https://patterns.dev/react/render-props-pattern)
