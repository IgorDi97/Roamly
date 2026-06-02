import { NextRequest, NextResponse } from 'next/server'
import { planTrip } from '@/lib/agent'
import type { SearchParams } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as SearchParams
    if (!body.budget || !body.duration || !body.airport || !body.tripType || !body.hotelType) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }
    if (Number(body.budget) < 100) {
      return NextResponse.json({ error: 'Presupuesto mínimo: 100€' }, { status: 400 })
    }
    const plan = await planTrip(body)
    return NextResponse.json(plan)
  } catch (error) {
    console.error('[/api/trip] Error:', error)
    return NextResponse.json({ error: 'Error al generar el plan de viaje. Inténtalo de nuevo.' }, { status: 500 })
  }
}
