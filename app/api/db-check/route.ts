import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * GET /api/db-check - Verifies database connectivity.
 * Returns 200 { ok: true } if Payload can connect and query; 503 { ok: false, error } otherwise.
 * Use this to confirm whether "property not found" is due to no DB connection.
 */
export async function GET() {
  const hasDbUrl = Boolean(
    process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0
  )
  if (!hasDbUrl) {
    console.error('[db-check] DATABASE_URL is missing or empty')
    return NextResponse.json(
      { ok: false, error: 'DATABASE_URL is not set' },
      { status: 503 }
    )
  }
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'properties',
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const count = result.totalDocs ?? result.docs?.length ?? 0
    console.log('[db-check] connected successfully, properties totalDocs:', result.totalDocs)
    return NextResponse.json({
      ok: true,
      message: 'Database connected',
      propertiesCount: count,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const name = err instanceof Error ? err.name : ''
    const isLikelyConnection =
      /mongo|mongoose|connect|ECONNREFUSED|ENOTFOUND|authentication|MongoServerError|AtlasError/i.test(
        name + message
      )
    console.error('[db-check] database error:', name, message)
    if (isLikelyConnection) {
      console.error('[db-check] This looks like a database connection or auth issue. Check DATABASE_URL (e.g. /? before query params), network, and MongoDB Atlas allowlist.')
    }
    return NextResponse.json(
      {
        ok: false,
        error: message,
        hint: isLikelyConnection
          ? 'Likely database connection or auth issue. Check DATABASE_URL and MongoDB Atlas.'
          : undefined,
      },
      { status: 503 }
    )
  }
}
