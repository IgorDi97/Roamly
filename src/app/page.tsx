'use client'

import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import SearchForm from '@/components/SearchForm'
import Features from '@/components/Features'
import Footer from '@/components/Footer'

export default function Home() {
  const router = useRouter()

  function handleSearch(params: URLSearchParams) {
    router.push(`/trip?${params.toString()}`)
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <Navbar />

      <section className="relative flex flex-col items-center justify-center px-4 pt-28 pb-20 text-center overflow-hidden">
        <div
          className="absolute rounded-full opacity-20 pointer-events-none"
          style={{
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, #b9ddfd 0%, transparent 70%)',
            top: '-200px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />

        <div className="stagger relative z-10 max-w-3xl mx-auto">
          <span
            className="inline-block mb-5 px-4 py-1.5 rounded-full text-sm font-medium"
            style={{ background: '#e0effe', color: '#026bc0', border: '1px solid #b9ddfd' }}
          >
            ✦ Planificación de viajes con IA
          </span>

          <h1
            className="mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              color: 'var(--color-ink)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Tu próxima aventura,<br />
            <span style={{ color: 'var(--color-sky)' }}>planificada en segundos.</span>
          </h1>

          <p
            className="mb-12 mx-auto"
            style={{
              fontSize: '1.1rem',
              color: 'var(--color-muted)',
              maxWidth: 520,
              lineHeight: 1.7,
            }}
          >
            Dinos tu presupuesto, el tipo de viaje y tu aeropuerto de salida.
            Nuestra IA busca vuelos reales, encuentra los mejores hoteles según
            la temporada y crea un itinerario día a día — solo para ti.
          </p>

          <SearchForm onSearch={handleSearch} />
        </div>

        <div className="relative z-10 flex flex-wrap gap-3 justify-center mt-10 opacity-60">
          {['🌿 Naturaleza', '🏛️ Cultura', '🧗 Aventura', '🕌 Espiritual', '🏖️ Playa', '🍷 Gastronomía'].map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm"
              style={{ background: 'var(--color-sand)', color: 'var(--color-earth)', border: '1px solid var(--color-border)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <Features />
      <Footer />
    </main>
  )
}
