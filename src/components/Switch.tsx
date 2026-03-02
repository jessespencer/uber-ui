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
        <div className="absolute inset-0 rounded-[100px] bg-gradient-to-b from-surface-pressed-from to-surface-pressed-to shadow-[0_1px_0_rgba(255,255,255,0.3)]">
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_3px_rgba(0,0,0,0.5)]" />
        </div>
        {/* Outline */}
        <div className="absolute inset-0 rounded-[100px] border border-border-dark" />
        {/* Focus glow ring */}
        <div className="absolute inset-0 rounded-[100px] hidden group-focus-visible:block border-2 border-[#e0f97d] shadow-[0_0_4px_#92d300]" />

        {/* Track — 48×8, 16px padding each side */}
        {checked ? (
          <div className="absolute left-[16px] top-[16px] w-[48px] h-[8px] rounded-[4px] bg-[#96cc0c] shadow-[0_0_8px_rgba(146,211,0,0.8)]">
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_0_rgba(255,255,255,0.8)]" />
          </div>
        ) : (
          <div className="absolute left-[16px] top-[16px] w-[48px] h-[8px] rounded-[100px] bg-[#303233] shadow-[0_1px_0_rgba(255,255,255,0.3)]">
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_5px_rgba(0,0,0,0.8)]" />
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
          <div className="absolute -inset-[2px] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      <span
        className={[
          'font-normal text-[16px] w-[32px] text-left',
          checked ? 'text-[#eeffab] [text-shadow:0_0_8px_rgba(146,211,0,0.8)]' : 'text-text-secondary [text-shadow:0_-1px_0_rgba(0,0,0,0.7)]',
        ].join(' ')}
      >
        {checked ? 'ON' : 'OFF'}
      </span>
    </div>
  )
}
