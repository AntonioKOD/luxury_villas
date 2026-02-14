import { NextResponse } from 'next/server'
import { getPropertyById } from '@/actions'

const CACHE_CONTROL = 'public, s-maxage=60, stale-while-revalidate=120'

/**
 * GET /api/properties/[id] - Returns a single property (uses cached list). For detail page, booking widget, images.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const trimmedId = typeof id === 'string' ? id.trim() : ''
  if (!trimmedId || trimmedId === 'undefined') {
    return NextResponse.json({ error: 'Missing property id' }, { status: 400 })
  }
  try {
    const property = await getPropertyById(trimmedId)
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }
    return NextResponse.json(property, {
      headers: { 'Cache-Control': CACHE_CONTROL },
    })
  } catch (err) {
    console.error('GET /api/properties/[id] error:', trimmedId, err)
    return NextResponse.json({ error: 'Property not found' }, { status: 404 })
  }
}
