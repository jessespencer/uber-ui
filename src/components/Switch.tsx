import { useState } from 'react'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Switch({ checked, onChange }: SwitchProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <div
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onClick={() => onChange(!checked)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(!checked) } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="inline-flex items-center gap-[8px] cursor-pointer select-none group"
    >
      {/* Switch track — 80×40, pill shape, pressed surface */}
      <div className="relative w-[80px] h-[40px]">
        {/* BG — pressed surface */}
        <div className="absolute inset-0 rounded-[100px] bg-gradient-to-b from-surface-pressed-from to-surface-pressed-to shadow-[var(--shadow-pressed-outer)]">
          <div className="absolute inset-0 rounded-[inherit] shadow-[var(--shadow-inner-pressed)]" />
        </div>
        {/* Outline */}
        <div className="absolute inset-0 rounded-[100px] border border-border-dark" />
        {/* Focus glow ring */}
        <div className="absolute inset-0 rounded-[100px] hidden group-focus-visible:block border-2 border-accent-focus shadow-[var(--shadow-focus-ring)]" />

        {/* Track — 48×8, 16px padding each side */}
        {checked ? (
          <div
            className="absolute left-[16px] top-[16px] w-[48px] h-[8px] rounded-[4px] shadow-[var(--switch-track-on-shadow)]"
            style={{ background: 'linear-gradient(to right, var(--accent-gradient-from), var(--accent-gradient-to))' }}
          >
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_0_rgba(255,255,255,0.8)]" />
          </div>
        ) : (
          <div
            className="absolute left-[16px] top-[16px] w-[48px] h-[8px] rounded-[100px] shadow-[var(--shadow-pressed-outer)]"
            style={{ backgroundColor: 'var(--switch-track-off-bg)' }}
          >
            <div className="absolute inset-0 rounded-[inherit] shadow-[var(--switch-track-off-shadow)]" />
          </div>
        )}

        {/* Handle — 24×24 polished metallic knob */}
        <div
          className={[
            'absolute top-[8px] size-[24px]',
            'transition-all duration-200',
            pressed ? 'scale-95' : hovered ? 'scale-105' : '',
          ].join(' ')}
          style={{ left: checked ? 48 : 8 }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(#F0F5F2 9%, #CBCBCB 21%, #CBCBCB 31%, #F0F5F2 42%, #CBCBCB 54%, #F0F5F2 66%, #CBCBCB 76%, #F0F5F2 88%, #CBCBCB 98%)',
            }}
          >
            <div className="absolute inset-0 rounded-full shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.8)]" />
          </div>
          <div className="absolute -inset-[2px] rounded-full shadow-[var(--handle-shadow)]" />
        </div>
      </div>

      <span
        className={[
          'font-normal text-[16px] w-[32px] text-left',
          checked ? 'text-accent-active [text-shadow:var(--switch-on-text-shadow)]' : 'text-text-secondary [text-shadow:var(--text-shadow-primary)]',
        ].join(' ')}
      >
        {checked ? 'ON' : 'OFF'}
      </span>
    </div>
  )
}
