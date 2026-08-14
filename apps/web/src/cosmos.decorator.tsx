// The Cosmos renderer bundles this decorator but not the app entry
// (main.tsx). Import the app stylesheet here so Tailwind reaches the fixtures.
import '@/styles/globals.css'

// The app is dark-first; set the dark class before first paint so fixtures
// match the running app.
document.documentElement.classList.add('dark')

// Showcase layout: center fixtures with padding. `fixed`-positioned fixtures
// (toolbar, FABs) are unaffected by the flex wrapper.
export default function CosmosDecorator({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen w-full items-center justify-center p-8">{children}</div>
}
