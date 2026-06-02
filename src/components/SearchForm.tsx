'use client'

import { useState } from 'react'

const TRIP_TYPES = [
  { id: 'naturaleza',    label: '🌿 Naturaleza' },
  { id: 'aventura',      label: '🧗 Aventura' },
  { id: 'espiritual',    label: '🕌 Espiritual' },
  { id: 'cultural',      label: '🏛️ Cultural' },
  { id: 'playa',         label: '🏖️ Playa' },
  { id: 'gastronomia',   label: '🍷 Gastronomía' },
  { id: 'romantico',     label: '💑 Romántico' },
  { id: 'urbano',        label: '🏙️ Urbano' },
]

const HOTEL_TYPES = [
  { id: 'hostel',        label: '🛏 Hostel' },
  { id: 'bb',            label: '🏡 B&B' },
  { id: 'hotel',         label: '🏨 Hotel' },
  { id: 'resort',        label: '🌴 Resort' },
  { id: 'apartamento',   label: '🏠 Apartamento' },
  { id: 'agroturismo',   label: '🌾 Agroturismo' },
]

const CURRENCIES = [
  { code: 'EUR', symbol: '€' },
  { code: 'USD', symbol: '$' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
]

interface Props {
  onSearch: (params: URLSearchParams) => void
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

function getDefaultReturn() {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString().split('T')[0]
}

function nightsBetween(from: string, to: string): number {
  if (!from || !to) return 0
  const diff = new Date(to).getTime() - new Date(from).getTime()
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)))
}

export default function SearchForm({ onSearch }: Props) {
  const [budget, setBudget] = useState('')
  const [dateFrom, setDateFrom] = useState(getTodayStr())
  const [dateTo, setDateTo] = useState(getDefaultReturn())
  const [airport, setAirport] = useState('')
  const [destination, setDestination] = useState('')
  const [tripType, setTripType] = useState('')
  const [hotelType, setHotelType] = useState('')
  const [currency, setCurrency] = useState('EUR')
  const [error, setError] = useState('')

  const nights = nightsBetween(dateFrom, dateTo)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!budget || !dateFrom || !dateTo || !airport || !tripType || !hotelType) {
      setError('Por favor, completa todos los campos obligatorios.')
      return
    }
    if (new Date(dateTo) <= new Date(dateFrom)) {
      setError('La fecha de regreso debe ser posterior a la de salida.')
      return
    }

    const params = new URLSearchParams({
      budget,
      duration: String(nights),
      dateFrom,
      dateTo,
      airport,
      tripType,
      hotelType,
      currency,
      destination,
    })
    onSearch(params)
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 12,
    border: '1px solid var(--color-border)',
    background: '#fff',
    fontSize: '0.95rem',
    color: 'var(--color-ink)',
    outline: 'none',
    transition: 'border-color 0.15s',
  } as React.CSSProperties

  const labelStyle = {
    fontSize: '0.72rem',
    color: 'var(--color-muted)',
    fontWeight: 500,
    display: 'block',
    marginBottom: 6,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.07em',
  }

  const chipBase = {
    padding: '8px 16px',
    borderRadius: 100,
    fontSize: '0.88rem',
    cursor: 'pointer',
    border: '1px solid var(--color-border)',
    background: '#fff',
    color: 'var(--color-muted)',
    transition: 'all 0.15s',
    userSelect: 'none' as const,
  }

  const chipActive = {
    ...chipBase,
    background: 'var(--color-ink)',
    color: '#fff',
    borderColor: 'var(--color-ink)',
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full text-left"
      style={{
        background: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 24,
        padding: '28px 28px 24px',
        maxWidth: 660,
        margin: '0 auto',
      }}
    >
      {/* Fila 1: Presupuesto + Moneda */}
      <div className="flex gap-3 mb-4">
        <div style={{ flex: 2 }}>
          <label style={labelStyle}>Presupuesto total *</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }}>
              {CURRENCIES.find(c => c.code === currency)?.symbol}
            </span>
            <input
              type="number"
              placeholder="1500"
              min={100}
              value={budget}
              onChange={e => setBudget(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 28 }}
              onFocus={e => (e.target.style.borderColor = 'var(--color-sky)')}
              onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Moneda</label>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            style={inputStyle}
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>{c.code}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Fila 2: Fechas */}
      <div className="flex gap-3 mb-4">
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Fecha de salida *</label>
          <input
            type="date"
            value={dateFrom}
            min={getTodayStr()}
            onChange={e => {
              setDateFrom(e.target.value)
              if (e.target.value >= dateTo) {
                const d = new Date(e.target.value)
                d.setDate(d.getDate() + 7)
                setDateTo(d.toISOString().split('T')[0])
              }
            }}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--color-sky)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Fecha de regreso *</label>
          <input
            type="date"
            value={dateTo}
            min={dateFrom}
            onChange={e => setDateTo(e.target.value)}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--color-sky)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>
        {nights > 0 && (
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 12, flexShrink: 0 }}>
            <span style={{
              background: '#e0effe',
              color: '#026bc0',
              borderRadius: 100,
              padding: '6px 12px',
              fontSize: '0.82rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}>
              {nights} noche{nights !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Fila 3: Aeropuerto + Destino */}
      <div className="flex gap-3 mb-5">
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Aeropuerto de salida *</label>
          <input
            type="text"
            placeholder="Ej. Madrid (MAD), Valencia (VLC)"
            value={airport}
            onChange={e => setAirport(e.target.value)}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--color-sky)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Destino (opcional)</label>
          <input
            type="text"
            placeholder="Déjalo vacío para que la IA elija"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--color-sky)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>
      </div>

      {/* Tipo de viaje */}
      <div className="mb-5">
        <label style={labelStyle}>Tipo de viaje *</label>
        <div className="flex flex-wrap gap-2">
          {TRIP_TYPES.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTripType(t.id)}
              style={tripType === t.id ? chipActive : chipBase}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alojamiento */}
      <div className="mb-6">
        <label style={labelStyle}>Tipo de alojamiento *</label>
        <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', marginBottom: 8, marginTop: -2 }}>
          La IA seleccionará las mejores opciones según la temporada y tu presupuesto
        </p>
        <div className="flex flex-wrap gap-2">
          {HOTEL_TYPES.map(h => (
            <button
              key={h.id}
              type="button"
              onClick={() => setHotelType(h.id)}
              style={hotelType === h.id ? chipActive : chipBase}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p style={{ fontSize: '0.85rem', color: '#dc2626', marginBottom: 12 }}>{error}</p>
      )}

      <button
        type="submit"
        className="w-full py-4 rounded-2xl font-medium text-base"
        style={{
          background: 'var(--color-ink)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '-0.01em',
          transition: 'opacity 0.15s',
        }}
        onMouseOver={e => ((e.target as HTMLButtonElement).style.opacity = '0.85')}
        onMouseOut={e => ((e.target as HTMLButtonElement).style.opacity = '1')}
      >
        Buscar mi viaje ✦
      </button>
    </form>
  )
}
