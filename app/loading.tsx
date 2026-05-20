export default function GlobalLoading() {
  return (
    <div className="relative min-h-dvh bg-surface-0">
      {/* Top progress strip */}
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden">
        <div
          className="h-full w-1/3 animate-[marquee_1.6s_linear_infinite] bg-gradient-to-r from-transparent via-brand-amber to-transparent"
          aria-hidden
        />
      </div>
      <div className="grid min-h-dvh place-items-center px-6">
        <p className="display-headline-eyebrow text-fg-secondary">
          Composing — one moment
        </p>
      </div>
    </div>
  )
}
