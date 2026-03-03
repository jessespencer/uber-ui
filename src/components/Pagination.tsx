interface PaginationProps {
  total: number
  current: number
  onChange: (index: number) => void
}

export function Pagination({ total, current, onChange }: PaginationProps) {
  return (
    <div className="inline-flex items-center gap-[8px]">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className="w-[24px] h-[24px] flex items-center justify-center cursor-pointer group outline-none rounded-full focus-visible:shadow-[var(--shadow-focus-glow)]"
          aria-label={`Page ${i + 1}`}
        >
          {i === current ? (
            // Active dot — accent with glow
            <div className="w-[16px] h-[16px] rounded-full bg-accent shadow-[0_0_8px_var(--color-accent-glow),0_2px_2px_rgba(0,0,0,0.3)]">
              <div className="w-full h-full rounded-full shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]" />
            </div>
          ) : (
            // Inactive dot — pressed surface, lightens on hover
            <div className="relative w-[16px] h-[16px]">
              <div className="absolute inset-0 rounded-full border border-border-dark" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-surface-pressed-from to-surface-pressed-to shadow-[var(--shadow-pressed-outer)] border border-border-dark-alt group-hover:from-[var(--checkbox-hover-from)] group-hover:to-[var(--checkbox-hover-to)] transition-colors duration-100">
                <div className="absolute inset-0 rounded-full shadow-[var(--shadow-inner-pressed)]" />
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
