const features = [
  {
    icon: '✈️',
    title: 'Búsqueda de vuelos real',
    desc: 'Analizamos rutas reales desde tu aeropuerto y sugerimos las mejores opciones que se ajusten a tu presupuesto y temporada.',
  },
  {
    icon: '🏨',
    title: 'Alojamiento inteligente',
    desc: 'La IA evalúa los precios de la temporada elegida y selecciona el alojamiento ideal para tu estilo y presupuesto.',
  },
  {
    icon: '🗓️',
    title: 'Itinerario día a día',
    desc: 'Mañana, tarde y noche planificados. Nombres de lugares reales, restaurantes locales, transporte y consejos prácticos.',
  },
  {
    icon: '💰',
    title: 'Respeta tu presupuesto',
    desc: 'Tu presupuesto se respeta en cada paso. Sin sorpresas, sin excesos. La IA ajusta todo según la temporada.',
  },
  {
    icon: '📅',
    title: 'Precios por temporada',
    desc: 'Planifica con antelación y ve cómo varían los precios. Ideal para organizar las vacaciones de verano desde enero.',
  },
  {
    icon: '⚡',
    title: 'Listo en segundos',
    desc: 'Sin pestañas interminables ni comparativas. Una búsqueda, plan completo, resultados al instante.',
  },
]

export default function Features() {
  return (
    <section
      id="como-funciona"
      className="py-24 px-4"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              color: 'var(--color-ink)',
              marginBottom: 12,
            }}
          >
            Todo lo que hace un agente de viajes,<br />
            <span style={{ color: 'var(--color-sky)' }}>en una sola búsqueda.</span>
          </h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: 480, margin: '0 auto' }}>
            La IA de Roamly gestiona vuelos, hoteles e itinerarios simultáneamente
            — así puedes concentrarte en hacer la maleta.
          </p>
        </div>

        <div
          className="grid gap-6 stagger"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {features.map(f => (
            <div
              key={f.title}
              className="rounded-2xl p-6"
              style={{ background: '#fff', border: '1px solid var(--color-border)' }}
            >
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  marginBottom: 8,
                  color: 'var(--color-ink)',
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
