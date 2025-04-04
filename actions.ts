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

export async function getAvailability(slug: string){
    const availability = await payload.findByID({
        collection: 'properties',
        id: slug,
        depth: 2,
        select: { availability: true }
    })
    console.log(availability)
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


  

 