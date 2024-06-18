import { t } from 'elysia'


export const errorResponse500 = t.Object({
    message: t.String({ enum: ['Internal Server Error'] }) // Specify the exact error message
  })

export const errorResponse403 = t.Object({
  message: t.String({ enum: ['Forbidden'] }) // Specify the exact error message
})

export const errorResponse401 =  t.Object({
    error: t.String({ enum: ['Unauthorized'] }),
})

export const errorResponse404 =  t.Object({
    error: t.String({ enum: ['Not found error'] }),
})

