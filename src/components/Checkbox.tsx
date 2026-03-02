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
        {/* BG — gradient surface (matches pressed button style) */}
        <div
          className={`absolute inset-0 rounded-[4px] transition-all duration-100 bg-gradient-to-b shadow-[0_1px_0_rgba(255,255,255,0.3)] border border-border-dark-alt ${
            hovered && !pressed
              ? 'from-[#363839] to-[#4a4b4c]'
              : 'from-surface-pressed-from to-surface-pressed-to'
          }`}
        >
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_3px_rgba(0,0,0,0.5)]" />
        </div>
        {/* Focus glow ring */}
        <div className="absolute inset-0 rounded-[4px] hidden group-focus-visible:block border-2 border-accent-focus shadow-[0_0_4px_#92d300]" />
        {/* Checkmark icon */}
        {checked && (
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${iconState.pressed}`}>
            <CheckIcon className="w-[24px] h-[24px]" />
          </div>
        )}
      </button>
      {label && (
        <span className="font-normal text-[16px] text-text-primary [text-shadow:0_-1px_0_rgba(0,0,0,0.7)]">
          {label}
        </span>
      )}
    </label>
  )
}
