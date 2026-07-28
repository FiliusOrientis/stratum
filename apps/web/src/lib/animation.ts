/**
 * Animation constants based on Emil Kowalski's design engineering principles.
 * See ~/.agents/skills/emil-design-eng/SKILL.md for the full framework.
 *
 * Easing curves:
 * - ease-out: starts fast, feels responsive. For entering elements.
 * - ease-in-out: natural acceleration/deceleration. For on-screen movement.
 * - ease-drawer: iOS-like drawer curve from Ionic Framework.
 *
 * Durations:
 * - press: 100-160ms (button feedback)
 * - tooltip: 125-200ms
 * - dropdown: 150-250ms
 * - modal/drawer: 200-300ms
 * - decoration: can be longer
 */

export const easeOut = [0.23, 1, 0.32, 1] as const
export const easeInOut = [0.77, 0, 0.175, 1] as const
export const easeDrawer = [0.32, 0.72, 0, 1] as const

export const springPreset = {
  type: 'spring' as const,
  duration: 0.25,
  bounce: 0.1,
}
