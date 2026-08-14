import { ThemeProvider } from 'next-themes'
import { ThemeToggle } from './theme-toggle'

export const Default = () => (
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem={false}
    enableColorScheme={false}
  >
    <ThemeToggle position="center" />
  </ThemeProvider>
)

export default { Default }
