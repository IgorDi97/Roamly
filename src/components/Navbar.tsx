'use client'
import Link from 'next/link'
export default function Navbar() {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap" />
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e8e0d4' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/logo.png" alt="Roamly" style={{ height: 48, width: 48, objectFit: 'contain' }} />
            <div>
              <div style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '1.7rem', fontWeight: 700, color: '#1B3A5C', letterSpacing: '-0.01em', lineHeight: 1 }}>Roamly</div>
              <div style={{ fontSize: '0.62rem', color: '#6b7280', marginTop: 3 }}>Tú imaginas, nosotros creamos el <span style={{ color: '#3DA8C4', fontWeight: 700 }}>viaje.</span></div>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/#como-funciona" style={{ fontSize: '0.9rem', color: '#6b7280', textDecoration: 'none' }}>Cómo funciona</Link>
          <Link href="/" style={{ background: '#1B3A5C', color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: 100, fontSize: '0.88rem', fontWeight: 600 }}>Planifica un viaje</Link>
        </div>
      </nav>
    </>
  )
}
