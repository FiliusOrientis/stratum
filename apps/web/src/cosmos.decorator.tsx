// The Cosmos renderer bundles this decorator but not the app entry
// (main.tsx). Import the app stylesheet here so Tailwind reaches the fixtures.
import '@/styles/globals.css'

// The app is dark-first; set the dark class before first paint so fixtures
// match the running app.
document.documentElement.classList.add('dark')

export default function CosmosDecorator({ children }: { children: React.ReactNode }) {
  return children
}
