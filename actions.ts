'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getPropertyId } from '@/lib/property-utils'
import { getCachedPropertiesList } from '@/lib/cached-properties'



function normalizeDocId(doc: Record<string, unknown>): Record<string, unknown> {
  let id = ''
  if (doc.id != null && doc.id !== '') {
    id = String(doc.id)
  } else if (doc._id != null) {
    const raw = doc._id
    id = typeof raw === 'string' ? raw : typeof (raw as { toString?: () => string })?.toString === 'function' ? (raw as { toString: () => string }).toString() : ''
  }
  // Return plain object with normalized id (overwrites doc.id for client serialization)
  return { ...doc, id }
}

export async function getProperties() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'properties',
    depth: 2,
    sort: 'name',
  })
  const docs = result.docs as Record<string, unknown>[]
  return docs.map(normalizeDocId)
}


/** Fetches property by id using cached list (works with MongoDB). Use this instead of getProperty for reliable lookup. */
export async function getPropertyById(id: string): Promise<Record<string, unknown> | null> {
  const trimmedId = typeof id === 'string' ? id.trim() : ''
  if (!trimmedId || trimmedId === 'undefined') return null
  try {
    const docs = await getCachedPropertiesList()
    const found = docs.find((doc) => getPropertyId(doc as { id?: string; _id?: unknown }) === trimmedId) ?? null
    if (!found) return null
    const idStr = getPropertyId(found as { id?: string; _id?: unknown }) || ''
    return { ...found, id: idStr }
  } catch (err) {
    console.error('[getPropertyById]', trimmedId, err)
    return null
  }
}

export async function getProperty(slug: string) {
  const id = typeof slug === 'string' ? slug.trim() : ''
  if (!id || id === 'undefined') return null
  try {
    const payload = await getPayload({ config })
    const property = await payload.findByID({
      collection: 'properties',
      id,
      depth: 2,
      overrideAccess: true,
    })
    return property
  } catch (err) {
    console.error('getProperty error:', id, err)
    return null
  }
}

export async function getAvailability(slug: string){
  const payload = await getPayload({config})
    const availability = await payload.findByID({
        collection: 'properties',
        id: slug,
        depth: 2,
        select: { availability: true }
    })
    return availability
}

interface BookingInput {
    guestName: string
    email: string
    checkInDate: string
    checkOutDate: string
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
    property: string
}

export async function createBooking(data: BookingInput){

  const payload = await getPayload({config})
    const booking = await payload.create({
        collection: 'bookings',
        data:{
            guestName: data.guestName,
            email: data.email,
            checkInDate: data.checkInDate,
            checkOutDate: data.checkOutDate,
            status: data.status || 'PENDING',
            property: data.property
        },
        depth: 2,
    })
    return booking
}

interface SignupInput {
    email: string;
    password: string;
    firstName: string;
    // add other fields as needed
  }
  
  export async function signupUser(data: SignupInput) {
    try {
      const payload = await getPayload({config})
      const user = await payload.create({
        collection: 'accounts',
        data: {
          email: data.email,
          password: data.password,
          Name: data.firstName,

        },
      });
      return user;
    } catch (error) {
      throw new Error(`Signup failed: ${error}`);
    }
  }


  

 