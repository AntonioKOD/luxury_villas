import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { Accounts } from './app/(payload)/collections/Accounts'
import { Properties } from './app/(payload)/collections/Properties'
import { Bookings } from './app/(payload)/collections/Bookings'
import { Media } from './app/(payload)/collections/Media'


export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  

  // Define and configure your collections in this array
  collections: [
    Accounts,
    Properties,
    Bookings,
    Media
  ],
  editor: lexicalEditor({}),

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})

