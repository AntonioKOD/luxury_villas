import { CollectionConfig } from "payload";


export const Bookings: CollectionConfig = {
    slug: 'bookings',
    access: {
      read: () => true,
      create: () => true,
      update: () => false,
      delete: () => true,
    },
    fields: [
        {
            name: 'guestName',
            type: 'text',
            required: true,
          },
          {
            name: 'email',
            type: 'email',
            required: true,
          },
          {
            name: 'checkInDate',
            type: 'date',
            required: true,
          },
          {
            name: 'checkOutDate',
            type: 'date',
            required: true,
          },
          {
            name: 'status',
            type: 'select',
            required: true,
            options: [
              { label: 'Pending', value: 'PENDING' },
              { label: 'Confirmed', value: 'CONFIRMED' },
              { label: 'Cancelled', value: 'CANCELLED' },
            ],
            defaultValue: 'PENDING',
          },
          {
            name: 'property',
            type: 'relationship',
            relationTo: 'properties', // This assumes you have a Properties collection defined
            required: true,
          },
    ]
}