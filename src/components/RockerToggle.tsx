import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

interface RockerToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function RockerToggle({ checked, onChange }: RockerToggleProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  // Housing colors
  const housingCls = isLight
    ? 'bg-gradient-to-b from-[#d8d8d8] to-[#e2e2e2] shadow-[2px_8px_24px_rgba(0,0,0,0.08),inset_-3px_-3px_7px_white,inset_3px_3px_7px_rgba(156,156,156,0.3)]'
    : 'bg-gradient-to-b from-[#1a1c1e] to-[#252729] shadow-[0_1px_0_rgba(255,255,255,0.15),inset_0_1px_2px_rgba(0,0,0,0.5)]'
  const housingBorderCls = isLight
    ? 'border border-white/60'
    : 'border border-[#0d0f11]'

  // Raised half (inactive side)
  const raisedCls = (isHov: boolean) => isLight
    ? isHov
      ? 'bg-gradient-to-b from-[#f5f5f5] to-[#c5c5c5]'
      : 'bg-gradient-to-b from-[#ffffff] to-[#d1d1d1]'
    : isHov
      ? 'bg-gradient-to-b from-[#505355] to-[#3e4042]'
      : 'bg-gradient-to-b from-[#454749] to-[#3a3c3e]'
  const raisedInner = isLight
    ? 'shadow-[inset_0_2px_0_white]'
    : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
  const raisedEdge = isLight
    ? 'bg-gradient-to-b from-white/30 to-transparent'
    : 'bg-gradient-to-b from-[rgba(255,255,255,0.15)] to-transparent'

  // Recessed half (active side)
  const recessedCls = isLight
    ? 'bg-[#e8e8e8]'
    : 'bg-gradient-to-b from-[#2a2c2e] to-[#353738]'
  const recessedInner = isLight
    ? 'shadow-[inset_-3px_-3px_7px_white,inset_3px_3px_7px_rgba(156,156,156,0.3)]'
    : 'shadow-[inset_0_3px_5px_rgba(0,0,0,0.6)]'
  const recessedInnerBottom = isLight
    ? 'shadow-[inset_-3px_-3px_7px_white,inset_3px_3px_7px_rgba(156,156,156,0.3)]'
    : 'shadow-[inset_0_-3px_5px_rgba(0,0,0,0.6)]'

  // Symbol colors
  const symbolBorder = isLight ? 'border-[#c0c0c0]' : 'border-[#1a1c1e]'
  const symbolBorderOff = isLight ? 'border-[#d0d0d0]' : 'border-[#222425]'
  const barOff = isLight
    ? 'bg-[#d0d0d0] shadow-[inset_-2px_-2px_4px_white,inset_2px_2px_4px_rgba(156,156,156,0.3)]'
    : 'bg-[#222425] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]'

  // Divider
  const dividerBg = isLight ? 'bg-[#d0d0d0]' : 'bg-[#1a1c1e]'
  const dividerHighlight = isLight ? 'bg-white/30' : 'bg-[rgba(255,255,255,0.06)]'

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
      {/* Outer housing — recessed frame */}
      <div className={`absolute inset-0 rounded-[8px] ${housingCls}`}>
        <div className={`absolute inset-0 rounded-[inherit] ${housingBorderCls}`} />
      </div>

      {/* Focus glow ring */}
      <div className="absolute inset-0 rounded-[8px] hidden group-focus-visible:block border-2 border-accent-focus shadow-[var(--shadow-focus-ring)]" />

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
            checked ? raisedCls(hovered) : recessedCls,
          ].join(' ')}
        >
          <div
            className={[
              'absolute inset-0 transition-shadow duration-150',
              checked ? raisedInner : recessedInner,
            ].join(' ')}
          />
          {checked && (
            <div className={`absolute inset-x-0 top-0 h-[3px] ${raisedEdge} rounded-t-[5px]`} />
          )}
          {/* "O" symbol — circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={[
                'w-[14px] h-[14px] rounded-full border-[2.5px] transition-colors duration-150',
                checked ? symbolBorder : symbolBorderOff,
              ].join(' ')}
            />
          </div>
        </div>

        {/* Divider line — center pivot */}
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-px">
          <div className={`absolute inset-0 ${dividerBg}`} />
          <div className={`absolute inset-x-0 top-px h-px ${dividerHighlight}`} />
        </div>

        {/* Bottom half — "|" symbol — recessed when ON, raised when OFF */}
        <div
          className={[
            'absolute inset-x-0 bottom-0 h-1/2 transition-all duration-150',
            checked ? recessedCls : raisedCls(hovered),
          ].join(' ')}
        >
          <div
            className={[
              'absolute inset-0 transition-shadow duration-150',
              checked ? recessedInnerBottom : (isLight ? 'shadow-[inset_0_-2px_0_white]' : 'shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)]'),
            ].join(' ')}
          />
          {!checked && (
            <div className={`absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-t ${isLight ? 'from-white/30' : 'from-[rgba(255,255,255,0.15)]'} to-transparent rounded-b-[5px]`} />
          )}
          {/* "|" symbol — line indicator, glows accent when ON */}
          <div className="absolute inset-0 flex items-center justify-center">
            {checked ? (
              <div
                className="relative w-[4px] h-[18px] rounded-full shadow-[0_0_10px_var(--color-accent-glow),0_0_20px_rgba(0,0,0,0.2)]"
                style={{ background: 'linear-gradient(to bottom, var(--accent-gradient-from), var(--accent-gradient-to))' }}
              >
                <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" />
              </div>
            ) : (
              <div className={`w-[4px] h-[18px] rounded-full ${barOff}`} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
