import { useRef, useCallback, useEffect, useState } from 'react'
import { gradientStroke } from './theme-utils'

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  const percent = ((value - min) / (max - min)) * 100

  const updateValue = useCallback(
    (clientX: number) => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const raw = min + ratio * (max - min)
      const stepped = Math.round(raw / step) * step
      onChange(Math.max(min, Math.min(max, stepped)))
    },
    [min, max, step, onChange],
  )

  useEffect(() => {
    if (!dragging) return
    function handleMove(e: MouseEvent) {
      updateValue(e.clientX)
    }
    function handleUp() {
      setDragging(false)
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [dragging, updateValue])

  return (
    <div
      ref={trackRef}
      className={`relative h-[32px] cursor-pointer outline-none ${className ?? ''}`}
      tabIndex={0}
      onMouseDown={(e) => {
        setDragging(true)
        updateValue(e.clientX)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault()
          onChange(Math.min(max, value + step))
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault()
          onChange(Math.max(min, value - step))
        }
      }}
      role="slider"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      {/* Track border */}
      <div className="absolute left-0 right-0 top-[8px] h-[16px] rounded-[100px] border border-border-dark" />
      {/* Track background — pressed surface with inset depth */}
      <div className="absolute left-0 right-0 top-[8px] h-[16px] rounded-[100px] bg-gradient-to-b from-surface-pressed-from to-surface-pressed-to shadow-[var(--shadow-pressed-outer)]">
        <div className="absolute inset-0 rounded-[inherit] shadow-[var(--shadow-inner-pressed)]" />
      </div>

      {/* Active fill */}
      <div
        className="absolute left-0 top-[8px] h-[16px] rounded-[100px] shadow-[0_0_8px_var(--color-accent-glow),0_2px_2px_rgba(0,0,0,0.3)]"
        style={{
          width: `${percent}%`,
          minWidth: 0,
          background: 'linear-gradient(to right, var(--accent-gradient-from), var(--accent-gradient-to))',
        }}
      >
        <div className="absolute inset-0 rounded-[inherit] shadow-[var(--slider-fill-highlight)]" />
      </div>

      {/* Handle — matches Switch knob */}
      <div
        className="absolute top-0 -ml-[16px] size-[32px]"
        style={{ left: `${percent}%` }}
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

        {/* Tooltip — shown while interacting */}
        {dragging && (
          <div className="absolute top-[38px] left-1/2 -translate-x-1/2">
            <div className="relative">
              {/* Gradient stroke border */}
              <div
                className="absolute -inset-px rounded-[5px] p-px pointer-events-none"
                style={gradientStroke}
              />
              {/* Surface */}
              <div className="rounded-[4px] bg-gradient-to-b from-surface-raised-from to-surface-raised-to shadow-[var(--shadow-raised)] px-[8px] py-[4px]">
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[var(--shadow-inner-highlight)]" />
                <span className="relative text-[13px] font-normal text-text-primary [text-shadow:var(--text-shadow-primary)] whitespace-nowrap">
                  {Math.round(percent)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
