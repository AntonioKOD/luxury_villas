/* eslint-disable @typescript-eslint/no-unused-vars */
import type {CollectionConfig} from 'payload'

export const Accounts: CollectionConfig = {
    slug: 'accounts',
    auth: {
        tokenExpiration: 7200,
        verify: {
            generateEmailHTML: ({ req, token, user }) => {
                // Use the token provided to allow your user to verify their account
                const url = `http://localhost:3000/verify?token=${token}`
        
                return `Hey ${user.email}, verify your email by clicking here: ${url}`
              },
        },
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

