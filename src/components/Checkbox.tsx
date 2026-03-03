import { useState } from 'react'
import { CheckIcon, iconState } from './icons'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <label className="inline-flex items-center gap-[10px] cursor-pointer select-none">
      <button
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false) }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        className="relative w-[24px] h-[24px] cursor-pointer group"
      >
        {/* Outline */}
        <div className="absolute inset-0 rounded-[4px] border border-border-dark" />
        {/* BG — gradient surface */}
        <div
          className={`absolute inset-0 rounded-[4px] transition-all duration-100 bg-gradient-to-b shadow-[var(--shadow-pressed-outer)] border border-border-dark-alt ${
            hovered && !pressed
              ? 'from-[var(--checkbox-hover-from)] to-[var(--checkbox-hover-to)]'
              : 'from-surface-pressed-from to-surface-pressed-to'
          }`}
        >
          <div className="absolute inset-0 rounded-[inherit] shadow-[var(--shadow-inner-pressed)]" />
        </div>
        {/* Focus glow ring */}
        <div className="absolute inset-0 rounded-[4px] hidden group-focus-visible:block border-2 border-accent-focus shadow-[var(--shadow-focus-ring)]" />
        {/* Checkmark icon */}
        {checked && (
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${iconState.pressed}`}>
            <CheckIcon className="w-[24px] h-[24px]" />
          </div>
        )}
      </button>
      {label && (
        <span className="font-normal text-[16px] text-text-primary [text-shadow:var(--text-shadow-primary)]">
          {label}
        </span>
      )}
    </label>
  )
}
