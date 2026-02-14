import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'

/** Cached fetch of all properties (revalidates every 60s). Shared by list API and getPropertyById. */
async function fetchPropertiesListRaw(): Promise<Record<string, unknown>[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'properties',
    depth: 2,
    sort: 'name',
    overrideAccess: true,
    limit: 500,
  })
  return (result.docs ?? []) as Record<string, unknown>[]
}

export const getCachedPropertiesList = unstable_cache(
  fetchPropertiesListRaw,
  ['properties-list'],
  { revalidate: 60 }
)
