'use server'
import {getPayload} from 'payload'
import config from '@payload-config'


const payload = getPayload({config})


export const getProperties = async () => {
    const properties = await (await payload).find({
        collection: 'properties',
        depth: 3,
    })

    return properties
}
