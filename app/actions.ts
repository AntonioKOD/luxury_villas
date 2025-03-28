'use server'
import {getPayload} from 'payload'
import config from '@payload-config'


const payload = getPayload({config})


export const getProperties = async (page=1, limit=10) => {
    const properties = await (await payload).find({
        collection: 'properties',
        depth: 3,
        limit,
        page,
        sort: 'name'
    })

    return properties
}
