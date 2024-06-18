import { t } from 'elysia'


export const ResponseTokenSchema = t.Object({
    data: t.Object({
      accessToken: t.String({ enum: ['eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJlYmM3YTBkZS0yY2NhLTRiYmYtODNkMy1mOWI5OTE5Mjg1NDMiLCJyb2xlIjoidXNlciIsImV4cCI6MTcwODg1OTk4MH0.igg5jqgjV4GlpoOXnTxC8CXrKXK35HFil91kHxRVsA4'] }), // ONLY FOR DEV MODE. SHOULD BE DELETED IN PROD
      refreshToken: t.String({ enum: ['eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJlYmM3YTBkZS0yY2NhLTRiYmYtODNkMy1mOWI5OTE5Mjg1NDMiLCJyb2xlIjoidXNlciIsImV4cCI6MTcwOTM3ODM4MH0.Pz8GiCkU-Zld1GhUDcWwO_0SlaiKdoe0D_mTt8uCUos'] }),
    })
  })