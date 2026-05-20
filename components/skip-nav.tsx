/**
 * Skip-to-content link — keyboard accessibility primitive.
 * Visually hidden until focused; jumps to the main landmark.
 */
export function SkipNav() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-brand-amber focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0a0a0a] focus:shadow-lg"
    >
      Skip to content
    </a>
  )
}
