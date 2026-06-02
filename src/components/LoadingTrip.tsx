'use client'

import { useEffect, useState } from 'react'

const STEPS = [
  { icon: '🔍', text: 'Buscando vuelos desde tu aeropuerto…' },
  { icon: '🏨', text: 'Analizando precios de alojamiento por temporada…' },
  { icon: '🗺️', text: 'Creando tu itinerario personalizado…' },
  { icon: '🌤️', text: 'Revisando condiciones de la temporada…' },
  { icon: '✦',  text: 'Poniendo todo junto…' },
]

export default function LoadingTrip() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s + 1) % STEPS.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center" style={{ minHeight: '60vh' }}>
      <div
        style={{
          width: 80, height: 80, borderRadius: '50%',
          border: '2px solid var(--color-border)',
          borderTopColor: 'var(--color-sky)',
          animation: 'spin 1s linear infinite',
          marginBottom: 32,
        }}
      >
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-ink)', marginBottom: 12 }}>
        Planificando tu viaje
      </h2>

      <div className="flex items-center gap-2" style={{ color: 'var(--color-muted)', fontSize: '0.95rem', height: 28 }}>
        <span>{STEPS[step].icon}</span>
        <span key={step} style={{ animation: 'fadeIn 0.3s ease-out' }}>{STEPS[step].text}</span>
      </div>

      <div className="mt-8 rounded-full overflow-hidden" style={{ width: 200, height: 3, background: 'var(--color-border)' }}>
        <div style={{
          height: '100%',
          background: 'var(--color-sky)',
          width: `${((step + 1) / STEPS.length) * 100}%`,
          transition: 'width 0.5s ease-out',
          borderRadius: 100,
        }} />
      </div>

      <p style={{ marginTop: 24, fontSize: '0.82rem', color: 'var(--color-muted)', opacity: 0.6 }}>
        Nuestra IA está creando un itinerario personalizado para ti.<br />
        Esto suele tardar entre 15 y 30 segundos.
      </p>
    </div>
  )
}
