import { withThemeByClassName } from '@storybook/addon-themes'
import type { Decorator, Preview, Renderer } from '@storybook/react-vite'

import '../src/styles/globals.css'
import './preview.css'

// Eager default theme: apply the dark class before the first paint so every
// view (canvas and docs) starts dark with no light flash. withThemeByClassName
// toggles this same class when the themes toolbar changes.
document.documentElement.classList.add('dark')

/**
 * Docs layout rule: stories that show a component/UI element get padding and
 * are centered. Fullscreen stories (app-level layouts) render edge-to-edge.
 * Canvas fills the viewport height; docs pages pad without forcing height.
 */
const withDocsLayout: Decorator = (Story, context) => {
  if (context.parameters.layout === 'fullscreen') {
    return <Story />
  }
  return (
    <div
      className={
        context.viewMode === 'docs'
          ? 'flex w-full items-center justify-center p-8'
          : 'flex min-h-screen w-full items-center justify-center p-8'
      }
    >
      <Story />
    </div>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    withThemeByClassName<Renderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
    withDocsLayout,
  ],
}

export default preview
