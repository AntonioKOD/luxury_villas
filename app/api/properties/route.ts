import { NextResponse } from 'next/server'
import { getPropertyId } from '@/lib/property-utils'
import { getCachedPropertiesList } from '@/lib/cached-properties'

const CACHE_CONTROL = 'public, s-maxage=60, stale-while-revalidate=120'

/**
 * GET /api/properties - Returns all properties (cached 60s). Used by homepage and /properties page.
 */
export async function GET() {
  try {
    const docs = await getCachedPropertiesList()
    const normalized = docs.map((doc) => {
      const id = getPropertyId(doc as { id?: string; _id?: unknown }) || ''
      return { ...doc, id }
    })
    return NextResponse.json(normalized, {
      headers: { 'Cache-Control': CACHE_CONTROL },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    const name = err instanceof Error ? err.name : ''
    const isDbError = /mongo|mongoose|connect|ECONNREFUSED|ENOTFOUND|authentication|MongoServerError|AtlasError/i.test(name + msg)
    console.error('GET /api/properties error:', name, msg)
    if (isDbError) {
      console.error('GET /api/properties: likely database connection issue. Try GET /api/db-check to verify.')
    }
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}
