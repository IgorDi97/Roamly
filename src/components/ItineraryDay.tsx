'use client'

import { useState } from 'react'
import type { TripDay } from '@/lib/types'

interface Props { day: TripDay }

export default function ItineraryDay({ day }: Props) {
  const [open, setOpen] = useState(day.day === 1)

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)', background: '#fff' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer', borderBottom: open ? '1px solid var(--color-border)' : 'none' }}
      >
        <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-ink)', color: '#fff', fontSize: '0.8rem', fontWeight: 500 }}>
          {day.day}
        </div>
        <div className="flex-1 min-w-0">
          <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{day.title}</div>
          {day.highlights && !open && (
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: 2 }}>
              {day.highlights.slice(0, 2).join(' · ')}
            </div>
          )}
        </div>
        <span style={{ color: 'var(--color-muted)', fontSize: '1.1rem', flexShrink: 0 }}>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="p-4" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <p style={{ color: 'var(--color-muted)', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: day.highlights?.length ? 14 : 0 }}>
            {day.description}
          </p>
          {day.highlights && day.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {day.highlights.map((h, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ background: 'var(--color-sand)', color: 'var(--color-earth)', border: '1px solid var(--color-border)' }}>
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
