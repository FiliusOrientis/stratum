// Applies to every fixture under src/. The app is dark-first; set the dark
// class before first paint so fixtures match the running app.
document.documentElement.classList.add('dark')

export default function CosmosDecorator({ children }: { children: React.ReactNode }) {
  return children
}
