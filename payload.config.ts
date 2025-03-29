import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { Accounts } from './app/(payload)/collections/Accounts.ts'
import { Properties } from './app/(payload)/collections/Properties.ts'
import { Bookings } from './app/(payload)/collections/Bookings.ts'
import { Media } from './app/(payload)/collections/Media.ts'
import {vercelBlobStorage} from '@payloadcms/storage-vercel-blob'


export default buildConfig({
  // Define and configure your collections in this array
  collections: [
    Accounts,
    Properties,
    Bookings,
    Media
  ],
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
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

