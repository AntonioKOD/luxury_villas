import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Properties: CollectionConfig = {
  slug: 'properties',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          label: 'Image Category',
          options: [
            { label: 'Living Room', value: 'living room' },
            { label: 'Kitchen', value: 'kitchen' },
            { label: 'Bedroom 1', value: 'bedroom 1' },
            { label: 'Bedroom 2', value: 'bedroom 2' },
            { label: 'Bedroom 3', value: 'bedroom 3' },
            { label: 'Bathroom 1', value: 'bathroom 1' },
            { label: 'Bathroom 2', value: 'bathroom 2'},
            { label: 'Outdoor', value: 'outdoor' },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'bookings',
      type: 'relationship',
      relationTo: 'bookings',
      hasMany: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'bedrooms',
      type: 'number',
      required: true,
    },
    {
      name: 'guests',
      type: 'number',
      required: true,
    },
    {
      name: 'bathrooms',
      type: 'number',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 60,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'availability',
      label: 'Unavailable Dates',
      type: 'array',
      admin: {
        description: 'Dates this property is unavailable',
      },
      fields: [
        {
          name: 'from',
          type: 'date',
          required: true,
          label: 'From',
        },
        {
          name: 'to',
          type: 'date',
          required: true,
          label: 'To',
        }
      ]
    },
  {
    name: 'priceId',
    type: 'text',
    admin: {
      description: 'Stripe Price ID for this property',
    },
    required: true,
  }
  ],
};