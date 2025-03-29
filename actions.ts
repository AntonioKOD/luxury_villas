'use server'
import {getPayload} from 'payload'
import config from '@payload-config'

const payload = await getPayload({config})

export async function getProperties(){
    const properties = await payload.find({
        collection: 'properties',
        depth: 2,
        sort: 'name'
    })
    const data = await properties.docs
    return data
}


export async function getProperty(slug: string){
    const property = await payload.findByID({
        collection: 'properties',
        id: slug,
        depth: 2
    })
    return property
}