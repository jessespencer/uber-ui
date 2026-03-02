import { useState } from 'react'
import { SearchIcon, XCircleIcon, iconState } from './icons'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  placeholder?: string
  className?: string
}

const gradientStroke = {
  background: 'linear-gradient(to bottom, #253039, #151B21)',
  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  maskComposite: 'exclude',
  WebkitMaskComposite: 'xor',
} as const

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className,
}: SearchInputProps) {
  const [clearHovered, setClearHovered] = useState(false)
  const [clearPressed, setClearPressed] = useState(false)

  const handleClear = () => {
    onChange('')
    onClear?.()
  }

  return (
    <div className={`relative h-[40px] group/search ${className ?? ''}`}>
      {/* Gradient stroke border */}
      <div
        className="absolute -inset-px rounded-[101px] p-px pointer-events-none group-has-focus-visible/search:hidden"
        style={gradientStroke}
      />
      {/* Pressed surface (same as pressed button) */}
      <div className="absolute inset-0 rounded-[100px] bg-gradient-to-b from-surface-pressed-from to-surface-pressed-to shadow-[0_1px_0_rgba(255,255,255,0.3)]">
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_3px_rgba(0,0,0,0.5)]" />
      </div>
      {/* Focus glow ring */}
      <div className="absolute inset-0 rounded-[100px] hidden group-has-focus-visible/search:block overflow-clip shadow-[0_0_4px_4px_rgba(146,211,0,0.25),0_0_0_2px_#e0f97d,0_3px_5px_rgba(0,0,0,0.4)]" />
      {/* Content */}
      <div className="relative flex items-center h-full pl-[8px] pr-[8px] gap-[8px]">
        <SearchIcon className="w-[24px] h-[24px] shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={[
            'flex-1 bg-transparent outline-none min-w-0',
            'font-normal text-[16px] text-text-primary placeholder:text-text-secondary/50',
            '[text-shadow:0_-1px_0_rgba(0,0,0,0.7)]',
          ].join(' ')}
        />
        {value && (
          <button
            onClick={handleClear}
            onMouseEnter={() => setClearHovered(true)}
            onMouseLeave={() => { setClearHovered(false); setClearPressed(false) }}
            onMouseDown={() => setClearPressed(true)}
            onMouseUp={() => setClearPressed(false)}
            className="shrink-0 flex items-center justify-center cursor-pointer transition-all duration-100"
          >
            <span className={clearPressed ? iconState.pressed : clearHovered ? iconState.hover : ''}>
              <XCircleIcon className="w-[24px] h-[24px]" />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
