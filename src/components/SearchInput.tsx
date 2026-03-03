import { useState } from 'react'
import { SearchIcon, XCircleIcon, iconState } from './icons'
import { gradientStroke } from './theme-utils'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  placeholder?: string
  className?: string
}

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
      {/* Pressed surface */}
      <div className="absolute inset-0 rounded-[100px] bg-gradient-to-b from-surface-pressed-from to-surface-pressed-to shadow-[var(--shadow-pressed-outer)]">
        <div className="absolute inset-0 rounded-[inherit] shadow-[var(--shadow-inner-pressed)]" />
      </div>
      {/* Focus glow ring */}
      <div className="absolute inset-0 rounded-[100px] hidden group-has-focus-visible/search:block overflow-clip shadow-[var(--shadow-focus)]" />
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
            '[text-shadow:var(--text-shadow-primary)]',
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
