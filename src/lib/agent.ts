import Anthropic from '@anthropic-ai/sdk'
import type { TripPlan, SearchParams } from './types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Eres Roamly, un experto agente de viajes con IA con conocimiento profundo de destinos de todo el mundo.
Tu trabajo es crear itinerarios de viaje realistas, inspiradores y ajustados al presupuesto.

Directrices:
- Sé específico con recomendaciones (nombra lugares reales, hoteles, restaurantes, aerolíneas)
- Respeta siempre el presupuesto — el coste total no puede superar el presupuesto indicado
- Ten muy en cuenta la TEMPORADA del viaje: analiza si es temporada alta, media o baja y ajusta precios y disponibilidad
- Para alojamiento: la IA debe seleccionar las mejores opciones según temporada y presupuesto, sin que el usuario elija estrellas
- Si no se especifica destino, sugiere el mejor destino para ese tipo de viaje y presupuesto en esas fechas
- Considera la logística: rutas de vuelo, transporte local, horarios
- Combina atracciones principales con joyas ocultas
- Ten en cuenta la temporalidad y condiciones de viaje actuales
- Responde SOLO con el objeto JSON, sin texto adicional, sin markdown`

export async function planTrip(params: SearchParams): Promise<TripPlan> {
  const { budget, duration, dateFrom, dateTo, airport, tripType, hotelType, destination, currency = 'EUR' } = params

  const destText = destination
    ? `El viajero quiere ir específicamente a: ${destination}.`
    : `Elige el MEJOR destino para este tipo de viaje y presupuesto en esas fechas — sorprende e inspira al viajero.`

  // Determinar temporada
  const departureDate = dateFrom ? new Date(dateFrom) : new Date()
  const month = departureDate.getMonth() + 1
  const season = month >= 6 && month <= 8 ? 'verano (temporada alta — precios elevados)'
    : month >= 12 || month <= 2 ? 'invierno (temporada baja — precios reducidos en muchos destinos)'
    : month >= 3 && month <= 5 ? 'primavera (temporada media — buen equilibrio precio-calidad)'
    : 'otoño (temporada media-baja — excelente para viajes económicos)'

  const userMessage = `Planifica un viaje completo con estos detalles:
- Presupuesto total: ${currency} ${budget}
- Aeropuerto de salida: ${airport}
- Fecha de salida: ${dateFrom || 'flexible'}
- Fecha de regreso: ${dateTo || 'flexible'}
- Duración: ${duration} noches
- Temporada de viaje: ${season}
- Tipo de viaje: ${tripType}
- Tipo de alojamiento deseado: ${hotelType} (selecciona las mejores opciones según temporada y presupuesto, NO el usuario)
- ${destText}

IMPORTANTE: Es ${season}. Ajusta todos los precios a la realidad de esa temporada.
Para el alojamiento tipo "${hotelType}", busca las mejores opciones disponibles considerando la temporada.

Devuelve un objeto JSON con EXACTAMENTE esta estructura:
{
  "destination": "Ciudad, País",
  "tagline": "Frase inspiradora sobre este viaje (máx 15 palabras)",
  "totalCost": <número — debe ser ≤ presupuesto>,
  "flightCost": <número — coste realista ida y vuelta desde ${airport} en ${season}>,
  "accommodationCost": <número — coste total realista para ${duration} noches en ${season}>,
  "activitiesCost": <número — presupuesto restante para comida, transporte, actividades>,
  "currency": "${currency}",
  "season": "${season}",
  "flightInfo": "Aerolíneas sugeridas, directo o con escala, duración del vuelo, consejos de reserva para esta temporada",
  "accommodationInfo": "Nombre específico del alojamiento o zona recomendada, qué incluye, por qué es ideal para esta temporada y este tipo de viaje. Explica por qué es la mejor opción calidad-precio.",
  "days": [
    {
      "day": 1,
      "title": "Título evocador corto para este día",
      "description": "Descripción detallada: actividades de mañana, tarde y noche. Incluye nombres de lugares reales, restaurantes locales, transporte, consejos prácticos. 3-5 frases.",
      "highlights": ["Punto clave 1", "Punto clave 2", "Punto clave 3"]
    }
  ],
  "tips": "4-5 consejos prácticos: mejores webs de reserva, costumbres locales, qué llevar, seguridad, moneda, conectividad, especialmente relevantes para ${season}",
  "bestTimeToVisit": "Mejores meses para visitar",
  "languages": "Idioma(s) local(es)",
  "timezone": "Huso horario UTC"
}

Genera exactamente ${duration} objetos de día. Sé específico, realista e inspirador. Todo en español.`

  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  })

  const text = response.content
    .filter(b => b.type === 'text')
    .map(b => (b as { type: 'text'; text: string }).text)
    .join('')

  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  return JSON.parse(clean) as TripPlan
}
