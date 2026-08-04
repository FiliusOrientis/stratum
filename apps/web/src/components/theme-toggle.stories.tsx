import type { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider, useTheme } from 'next-themes'
import type { ComponentProps } from 'react'
import { type ReactNode, useEffect } from 'react'
import { ThemeToggle, type ThemeTogglePosition } from './theme-toggle'

interface ThemeToggleStoryArgs extends ComponentProps<typeof ThemeToggle> {
  theme: 'dark' | 'light'
}

const POSITIONS: ThemeTogglePosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'middle-left',
  'center',
  'middle-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
]

function ThemeSync({ theme, children }: { theme: 'dark' | 'light'; children: ReactNode }) {
  const { setTheme } = useTheme()
  useEffect(() => {
    setTheme(theme)
  }, [theme, setTheme])
  return <>{children}</>
}

const meta: Meta<ThemeToggleStoryArgs> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    theme: { control: 'radio', options: ['dark', 'light'] },
    position: { control: 'select', options: POSITIONS },
  },
  decorators: [
    (Story, { args }) => (
      <ThemeProvider
        attribute="class"
        defaultTheme={args.theme}
        enableSystem={false}
        enableColorScheme={false}
        storageKey="stratum-story-theme"
      >
        <ThemeSync theme={args.theme}>
          <Story />
        </ThemeSync>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<ThemeToggleStoryArgs>

export const Default: Story = {
  args: { theme: 'dark', position: 'center' },
  render: ({ theme: _theme, ...args }) => <ThemeToggle {...args} />,
}
