'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import TripSummary from '@/components/TripSummary'
import ItineraryDay from '@/components/ItineraryDay'
import LoadingTrip from '@/components/LoadingTrip'
import Footer from '@/components/Footer'
import type { TripPlan } from '@/lib/types'

function TripContent() {
  const params = useSearchParams()
  const router = useRouter()
  const [plan, setPlan] = useState<TripPlan | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const fetched = useRef(false)

  useEffect(() => {
    if (fetched.current) return
    fetched.current = true

    async function fetchTrip() {
      try {
        const res = await fetch('/api/trip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            budget: params.get('budget'),
            duration: params.get('duration'),
            dateFrom: params.get('dateFrom'),
            dateTo: params.get('dateTo'),
            airport: params.get('airport'),
            tripType: params.get('tripType'),
            hotelType: params.get('hotelType'),
            destination: params.get('destination') || '',
            currency: params.get('currency') || 'EUR',
          }),
        })
        if (!res.ok) throw new Error('Error al generar el viaje')
        const data = await res.json()
        setPlan(data)
      } catch {
        setError('Algo salió mal. Por favor, inténtalo de nuevo.')
      } finally {
        setLoading(false)
      }
    }

    fetchTrip()
  }, [params])

  if (loading) return <LoadingTrip />

  if (error) return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <div style={{ fontSize: 48, marginBottom: 16 }}>✈️</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 12 }}>
        Algo salió mal
      </h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: 24 }}>{error}</p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 rounded-full font-medium"
        style={{ background: 'var(--color-sky)', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Intentar de nuevo
      </button>
    </div>
  )

  if (!plan) return null

  // Format dates for display
  const dateFrom = params.get('dateFrom')
  const dateTo = params.get('dateTo')
  const formatDate = (d: string | null) => {
    if (!d) return ''
    return new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 stagger">
        <span
          className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide"
          style={{ background: '#dbf3e5', color: '#146240' }}
        >
          ✓ Tu viaje está listo
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-ink)', lineHeight: 1.1, marginBottom: 8 }}>
          {plan.destination}
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '1.05rem', fontStyle: 'italic', marginBottom: 8 }}>
          {plan.tagline}
        </p>
        {dateFrom && dateTo && (
          <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)' }}>
            📅 {formatDate(dateFrom)} → {formatDate(dateTo)} · {plan.season}
          </p>
        )}
      </div>

      <TripSummary plan={plan} />

      <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <InfoCard icon="✈️" title="Vuelos" content={plan.flightInfo} />
        <InfoCard icon="🏨" title="Alojamiento" content={plan.accommodationInfo} />
      </div>

      <div className="mb-12">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: 20, color: 'var(--color-ink)' }}>
          Día a día
        </h2>
        <div className="flex flex-col gap-3">
          {plan.days.map(day => (
            <ItineraryDay key={day.day} day={day} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-6 mb-10" style={{ background: '#faf9f6', border: '1px solid var(--color-border)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 12 }}>
          💡 Consejos prácticos
        </h3>
        <p style={{ color: 'var(--color-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          {plan.tips}
        </p>
      </div>

      {(plan.languages || plan.timezone || plan.bestTimeToVisit) && (
        <div className="grid gap-3 mb-10" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {plan.languages && <MiniCard label="Idioma" value={plan.languages} icon="🗣️" />}
          {plan.timezone && <MiniCard label="Huso horario" value={plan.timezone} icon="🕐" />}
          {plan.bestTimeToVisit && <MiniCard label="Mejor época" value={plan.bestTimeToVisit} icon="☀️" />}
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 rounded-full font-medium text-sm"
          style={{ background: 'var(--color-ink)', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Planificar otro viaje
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 rounded-full font-medium text-sm"
          style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)', background: 'transparent', cursor: 'pointer' }}
        >
          Imprimir itinerario
        </button>
      </div>
    </div>
  )
}

function InfoCard({ icon, title, content }: { icon: string; title: string; content: string }) {
  return (
    <div className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid var(--color-border)' }}>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{title}</span>
      </div>
      <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>{content}</p>
    </div>
  )
}

function MiniCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="rounded-xl p-4" style={{ background: '#fff', border: '1px solid var(--color-border)' }}>
      <div style={{ fontSize: 18, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-muted)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{value}</div>
    </div>
  )
}

export default function TripPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      <Suspense fallback={<LoadingTrip />}>
        <TripContent />
      </Suspense>
      <Footer />
    </main>
  )
}
