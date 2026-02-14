declare module '@payloadcms/email-resend' {
  import type { EmailAdapter } from 'payload'

  export interface ResendAdapterArgs {
    apiKey: string
    defaultFromAddress: string
    defaultFromName: string
  }

  export const resendAdapter: (args: ResendAdapterArgs) => EmailAdapter
}
