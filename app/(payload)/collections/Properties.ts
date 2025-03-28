import { CollectionConfig } from "payload";
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
            maxRows: 10,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
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
        }
    ]
}