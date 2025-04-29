import { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const Properties: CollectionConfig = {
  slug: 'properties',
  access: {
    read: () => true,
    update: () => true,
  },
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
            { label: 'Bathroom 2', value: 'bathroom 2' },
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
      name: 'stripeProductId',
      type: 'text',
      admin: {
        description: 'Stripe Product ID (enter manually)',
      },
      required: true,
    },
    {
      name: 'seasonalPrices',
      label: 'Monthly Prices',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'month',
          label: 'Month',
          type: 'select',
          options: [
            { label: 'January', value: '1' },
            { label: 'February', value: '2' },
            { label: 'March', value: '3' },
            { label: 'April', value: '4' },
            { label: 'May', value: '5' },
            { label: 'June', value: '6' },
            { label: 'July', value: '7' },
            { label: 'August', value: '8' },
            { label: 'September', value: '9' },
            { label: 'October', value: '10' },
            { label: 'November', value: '11' },
            { label: 'December', value: '12' },
          ],
          required: true,
        },
        {
          name: 'price',
          label: 'Price (USD)',
          type: 'number',
          required: true,
        },
        {
          name: 'priceId',
          label: 'Stripe Price ID',
          type: 'text',
          required: true,
          admin: {
            description: 'Manually paste the Stripe Price ID for this month',
          },
        },
      ],
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
        },
      ],
    },
  ],
};
