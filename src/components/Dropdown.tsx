import { useState, useRef, useEffect, type ReactNode } from 'react'
import { ChevronDownIcon, iconState } from './icons'
import { gradientStroke } from './theme-utils'

interface DropdownOption {
  label: string
  icon?: ReactNode
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((o) => o.label === value)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
        setFocusedIndex(0)
      }
      return
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex((i) => Math.min(i + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((i) => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0) {
          onChange(options[focusedIndex].label)
          setOpen(false)
        }
        break
      case 'Escape':
        setOpen(false)
        break
    }
  }

  const isFocus = focused && !pressed
  const showStroke = !isFocus

  const triggerSurface = pressed
    ? 'from-surface-pressed-from to-surface-pressed-to shadow-[var(--shadow-pressed-outer)]'
    : isFocus
      ? 'from-surface-raised-from to-surface-raised-to overflow-clip shadow-[var(--shadow-focus)]'
      : hovered
        ? 'from-surface-hover-from to-surface-hover-to shadow-[var(--shadow-raised)]'
        : 'from-surface-raised-from to-surface-raised-to shadow-[var(--shadow-raised)]'

  const triggerInner = pressed
    ? 'shadow-[var(--shadow-inner-pressed)]'
    : 'shadow-[var(--shadow-inner-highlight)]'

  return (
    <div ref={ref} className={`relative inline-block ${className ?? ''}`} onKeyDown={handleKeyDown}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false) }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onFocus={(e) => { if (e.target.matches(':focus-visible')) setFocused(true) }}
        onBlur={() => setFocused(false)}
        className="relative w-full h-[40px] cursor-pointer outline-none"
      >
        {showStroke && (
          <div
            className="absolute -inset-px rounded-[5px] p-px pointer-events-none"
            style={gradientStroke}
          />
        )}
        <div className={`absolute inset-0 rounded-[4px] bg-gradient-to-b transition-all duration-100 ${triggerSurface}`}>
          <div className={`absolute inset-0 rounded-[inherit] pointer-events-none transition-shadow duration-100 ${triggerInner}`} />
        </div>
        <div className="relative flex items-center h-full px-[18px]">
          <span className="font-normal text-[16px] text-text-primary [text-shadow:var(--text-shadow-primary)] whitespace-nowrap">
            {selectedOption?.label ?? placeholder}
          </span>
          <span className={`absolute right-[8px] w-[24px] h-[24px] transition-all duration-100 ${pressed || open ? iconState.pressed : hovered ? iconState.hover : iconState.default}`}>
            <ChevronDownIcon className={`w-[24px] h-[24px] ${open ? 'rotate-180' : ''} transition-transform duration-100`} />
          </span>
        </div>
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute left-0 top-[48px] w-full z-50">
          <div className="relative">
            {/* Menu BG */}
            <div
              className="absolute -inset-px rounded-[5px] p-px pointer-events-none"
              style={gradientStroke}
            />
            <div className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-surface-raised-from to-surface-raised-to shadow-[var(--shadow-raised)]">
              <div className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[var(--shadow-inner-highlight)]" />
            </div>

            {/* Menu content */}
            <div className="relative px-[18px]">
              {options.map((option, i) => (
                <div key={option.label}>
                  {i > 0 && (
                    <div className="h-[2px] -mx-[18px] overflow-hidden">
                      <div className="h-px bg-divider-shadow" />
                      <div className="h-px bg-divider-highlight" />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      onChange(option.label)
                      setOpen(false)
                    }}
                    className={[
                      `flex items-center gap-[15px] w-[calc(100%+36px)] -mx-[18px] px-[18px] py-[9px] ${i === 0 ? 'rounded-t-[4px]' : ''} ${i === options.length - 1 ? 'rounded-b-[4px]' : ''}`,
                      'cursor-pointer transition-all duration-100 outline-none',
                      focusedIndex === i
                        ? 'bg-gradient-to-b from-surface-hover-from to-surface-hover-to text-accent-active'
                        : option.label === value
                          ? 'text-accent-active'
                          : 'text-text-primary hover:bg-gradient-to-b hover:from-surface-hover-from hover:to-surface-hover-to hover:text-accent-active',
                    ].join(' ')}
                  >
                    {option.icon && <span className="w-[24px] h-[24px] shrink-0">{option.icon}</span>}
                    <span className="flex-1 font-normal text-[16px] leading-[24px] [text-shadow:var(--text-shadow-primary)] whitespace-nowrap text-left">
                      {option.label}
                    </span>
                    {option.label === value && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                        <path d="M18.0591 4.36821C18.352 3.96842 18.885 3.87395 19.2863 4.18517L20.654 5.24545C21.0389 5.54399 21.1145 6.11026 20.821 6.51108L10.9455 20L3.33753 14.0993C2.96342 13.8088 2.88249 13.2689 3.18482 12.856L4.21643 11.4486C4.50647 11.0524 5.05607 10.9748 5.41942 11.2566L10.2644 15.0156L18.0591 4.36821Z" fill="currentColor"/>
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
