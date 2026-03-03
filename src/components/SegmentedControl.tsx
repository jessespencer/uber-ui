import { useState, type ReactNode } from 'react'
import { iconState } from './icons'
import { gradientStroke } from './theme-utils'

interface SegmentedOption {
  value: string
  icon?: ReactNode
  label?: string
}

interface SegmentedControlProps {
  options: SegmentedOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  const [hoveredIdx, setHoveredIdx] = useState(-1)
  const [pressedIdx, setPressedIdx] = useState(-1)
  const [focusedIdx, setFocusedIdx] = useState(-1)

  const selectedIdx = options.findIndex((o) => o.value === value)
  const lastIdx = options.length - 1

  return (
    <div className={`relative h-[40px] ${className ?? ''}`}>
      {/* BG — raised surface */}
      <div
        className="absolute -inset-px rounded-[5px] p-px pointer-events-none"
        style={gradientStroke}
      />
      <div className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-surface-raised-from to-surface-raised-to shadow-[var(--shadow-raised)]">
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[var(--shadow-inner-highlight)]" />
      </div>

      {/* Dividers — between segments, hidden when adjacent to selected */}
      {options.map((_, i) => {
        if (i === 0) return null
        const hideDiv = i === selectedIdx || i - 1 === selectedIdx
        if (hideDiv) return null
        return (
          <div
            key={`div-${i}`}
            className="absolute top-0 h-[40px] w-[2px] overflow-hidden z-[1]"
            style={{ left: `calc(${(i / options.length) * 100}% - 1px)` }}
          >
            <div className="absolute left-0 top-0 w-px h-full bg-divider-shadow" />
            <div className="absolute left-px top-0 w-px h-full bg-divider-highlight" />
          </div>
        )
      })}

      {/* Segments */}
      <div className="relative flex h-full">
        {options.map((option, i) => {
          const isFirst = i === 0
          const isLast = i === lastIdx
          const isSelected = i === selectedIdx
          const isHovered = hoveredIdx === i && !isSelected
          const isPressed = pressedIdx === i && !isSelected
          const isFocused = focusedIdx === i && !isSelected && !isPressed

          const borderRadius = isFirst
            ? '4px 0 0 4px'
            : isLast
              ? '0 4px 4px 0'
              : '0'

          let segmentCls = ''
          if (isSelected) {
            segmentCls = 'bg-gradient-to-b from-surface-pressed-from to-surface-pressed-to shadow-[var(--shadow-pressed-outer)]'
          } else if (isPressed) {
            segmentCls = 'bg-gradient-to-b from-surface-pressed-from to-surface-pressed-to shadow-[var(--shadow-inner-pressed)]'
          } else if (isFocused) {
            segmentCls = 'overflow-clip shadow-[var(--shadow-focus-glow)]'
          } else if (isHovered) {
            segmentCls = 'bg-gradient-to-b from-surface-hover-from to-surface-hover-to shadow-[var(--shadow-raised)]'
          }

          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => { setHoveredIdx(-1); setPressedIdx(-1) }}
              onMouseDown={() => setPressedIdx(i)}
              onMouseUp={() => setPressedIdx(-1)}
              onFocus={(e) => { if (e.target.matches(':focus-visible')) setFocusedIdx(i) }}
              onBlur={() => setFocusedIdx(-1)}
              className={`relative flex-1 h-[40px] px-[16px] flex items-center justify-center cursor-pointer outline-none ${
                isFirst ? 'rounded-l-[4px]' : ''
              } ${isLast ? 'rounded-r-[4px]' : ''}`}
            >
              {segmentCls && (
                <div
                  className={`absolute inset-0 transition-all duration-100 ${segmentCls}`}
                  style={{ borderRadius }}
                >
                  {isSelected && (
                    <div className="absolute inset-0 shadow-[var(--shadow-inner-pressed)]" style={{ borderRadius: 'inherit' }} />
                  )}
                  {(isHovered || isFocused) && (
                    <div className="absolute inset-0 shadow-[var(--shadow-inner-highlight)]" style={{ borderRadius: 'inherit' }} />
                  )}
                </div>
              )}
              {option.icon ? (
                <span
                  className={[
                    'relative w-[24px] h-[24px] transition-all duration-100',
                    isSelected || isPressed ? iconState.pressed : isHovered || isFocused ? iconState.hover : iconState.default,
                  ].join(' ')}
                >
                  {option.icon}
                </span>
              ) : (
                <span
                  className={[
                    'relative text-[13px] font-medium transition-all duration-100',
                    isSelected || isPressed ? 'text-accent-active [filter:drop-shadow(0_0_8px_var(--color-accent-glow))]' : isHovered || isFocused ? 'text-text-primary [text-shadow:var(--text-shadow-primary)]' : 'text-text-secondary [text-shadow:var(--text-shadow-primary)]',
                  ].join(' ')}
                >
                  {option.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
