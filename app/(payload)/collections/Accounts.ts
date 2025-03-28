import type {CollectionConfig} from 'payload'

export const Accounts: CollectionConfig = {
    slug: 'accounts',
    auth: {
        tokenExpiration: 7200,
        verify: true,
        maxLoginAttempts: 5,
        lockTime: 600 * 1000,

    },
    fields: [
        {
            name: 'Name',
            type: 'text',
            required: true
        },
    ]
}