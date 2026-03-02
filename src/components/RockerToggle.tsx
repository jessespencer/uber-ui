import { useState } from 'react'

interface RockerToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function RockerToggle({ checked, onChange }: RockerToggleProps) {
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
      className="relative w-[72px] h-[96px] cursor-pointer select-none group"
    >
      {/* Outer housing — dark recessed frame */}
      <div className="absolute inset-0 rounded-[8px] bg-gradient-to-b from-[#1a1c1e] to-[#252729] shadow-[0_1px_0_rgba(255,255,255,0.15),inset_0_1px_2px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 rounded-[inherit] border border-[#0d0f11]" />
      </div>

      {/* Focus glow ring */}
      <div className="absolute inset-0 rounded-[8px] hidden group-focus-visible:block border-2 border-accent-focus shadow-[0_0_4px_#92d300]" />

      {/* Rocker body — the tilting paddle */}
      <div
        className={[
          'absolute inset-[4px] rounded-[5px] overflow-hidden transition-transform duration-150',
          pressed ? 'scale-[0.98]' : '',
        ].join(' ')}
      >
        {/* Top half — "O" symbol — raised when ON, recessed when OFF */}
        <div
          className={[
            'absolute inset-x-0 top-0 h-1/2 transition-all duration-150',
            checked
              ? hovered
                ? 'bg-gradient-to-b from-[#505355] to-[#3e4042]' /* raised hover */
                : 'bg-gradient-to-b from-[#454749] to-[#3a3c3e]' /* raised */
              : 'bg-gradient-to-b from-[#2a2c2e] to-[#353738]',  /* recessed */
          ].join(' ')}
        >
          <div
            className={[
              'absolute inset-0 transition-shadow duration-150',
              checked
                ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
                : 'shadow-[inset_0_3px_5px_rgba(0,0,0,0.6)]',
            ].join(' ')}
          />
          {checked && (
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-b from-[rgba(255,255,255,0.15)] to-transparent rounded-t-[5px]" />
          )}
          {/* "O" symbol — circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={[
                'w-[14px] h-[14px] rounded-full border-[2.5px] transition-colors duration-150',
                checked
                  ? 'border-[#1a1c1e]'
                  : 'border-[#222425]',
              ].join(' ')}
            />
          </div>
        </div>

        {/* Divider line — center pivot */}
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-px">
          <div className="absolute inset-0 bg-[#1a1c1e]" />
          <div className="absolute inset-x-0 top-px h-px bg-[rgba(255,255,255,0.06)]" />
        </div>

        {/* Bottom half — "|" symbol — recessed when ON, raised when OFF */}
        <div
          className={[
            'absolute inset-x-0 bottom-0 h-1/2 transition-all duration-150',
            checked
              ? 'bg-gradient-to-b from-[#353738] to-[#2a2c2e]'   /* recessed */
              : hovered
                ? 'bg-gradient-to-b from-[#3e4042] to-[#505355]' /* raised hover */
                : 'bg-gradient-to-b from-[#3a3c3e] to-[#454749]' /* raised */,
          ].join(' ')}
        >
          <div
            className={[
              'absolute inset-0 transition-shadow duration-150',
              checked
                ? 'shadow-[inset_0_-3px_5px_rgba(0,0,0,0.6)]'
                : 'shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)]',
            ].join(' ')}
          />
          {!checked && (
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-t from-[rgba(255,255,255,0.15)] to-transparent rounded-b-[5px]" />
          )}
          {/* "|" symbol — line indicator, glows green when ON */}
          <div className="absolute inset-0 flex items-center justify-center">
            {checked ? (
              <div className="relative w-[4px] h-[18px] rounded-full bg-accent shadow-[0_0_10px_rgba(146,211,0,0.8),0_0_20px_rgba(146,211,0,0.4)]">
                <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" />
              </div>
            ) : (
              <div className="w-[4px] h-[18px] rounded-full bg-[#222425] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
