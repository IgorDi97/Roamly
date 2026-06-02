import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Roamly — Tu agente de viajes con IA',
  description: 'Dinos tu presupuesto, estilo de viaje y aeropuerto de salida. La IA de Roamly busca vuelos, hoteles y crea un itinerario completo día a día — solo para ti.',
  keywords: 'planificador de viajes, viajes con IA, vuelos, hoteles, itinerario, vacaciones',
  openGraph: {
    title: 'Roamly — Tu agente de viajes con IA',
    description: 'Planificación inteligente de viajes. Vuelos, hoteles, itinerario — todo en una búsqueda.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
