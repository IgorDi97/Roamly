import type { TripPlan } from '@/lib/types'

interface Props { plan: TripPlan }

export default function TripSummary({ plan }: Props) {
  const sym = plan.currency === 'USD' ? '$' : plan.currency === 'GBP' ? '£' : plan.currency === 'JPY' ? '¥' : '€'

  const cards = [
    { icon: '✈️', label: 'Vuelos',      value: `${sym}${plan.flightCost.toLocaleString()}`,         sub: 'Ida y vuelta por persona' },
    { icon: '🏨', label: 'Alojamiento', value: `${sym}${plan.accommodationCost.toLocaleString()}`,   sub: `${plan.days.length} noches` },
    { icon: '🗺️', label: 'Actividades', value: `${sym}${plan.activitiesCost.toLocaleString()}`,      sub: 'Comida, transporte y ocio' },
    { icon: '💰', label: 'Total',        value: `${sym}${plan.totalCost.toLocaleString()}`,           sub: 'Todo incluido', highlight: true },
  ]

  return (
    <div className="grid gap-3 mb-8 stagger" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
      {cards.map(card => (
        <div
          key={card.label}
          className="rounded-xl p-4"
          style={{
            background: card.highlight ? 'var(--color-ink)' : '#fff',
            border: card.highlight ? 'none' : '1px solid var(--color-border)',
            color: card.highlight ? '#fff' : 'inherit',
          }}
        >
          <div style={{ fontSize: 20, marginBottom: 8 }}>{card.icon}</div>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4, opacity: 0.6 }}>
            {card.label}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 2 }}>{card.value}</div>
          <div style={{ fontSize: '0.78rem', opacity: 0.55 }}>{card.sub}</div>
        </div>
      ))}
    </div>
  )
}
