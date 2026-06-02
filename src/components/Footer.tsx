export default function Footer() {
  return (
    <footer
      className="py-10 px-6 text-center"
      style={{
        borderTop: '1px solid var(--color-border)',
        color: 'var(--color-muted)',
        fontSize: '0.85rem',
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-ink)', marginBottom: 6 }}>
        Roamly
      </div>
      <p style={{ marginBottom: 4 }}>Tu agente de viajes con IA. Planifica mejor, explora más lejos.</p>
      <p style={{ opacity: 0.5, fontSize: '0.78rem' }}>
        © {new Date().getFullYear()} Roamly. Desarrollado con Claude AI.
      </p>
    </footer>
  )
}
