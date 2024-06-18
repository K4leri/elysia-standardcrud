
import { Elysia, NotFoundError, t  } from "elysia";
import { jwtAccessSetup, jwtRefreshSetup } from "../services/setup";
import { ResponseTokenSchema } from "../schemas/account";
import { errorResponse500 } from "../schemas/errorShemas";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";




export const account = new Elysia()
  .group('/account', (app) =>
  app
    .use(jwtAccessSetup)
    .use(jwtRefreshSetup)
    .post('/sendcode', async ({ body: {phone}}) => {
      const code = phone.split('').map(el => el).slice(0, 4).join('')
      return {data: {code: Number(code)}}
    }, 
    { 
      body: t.Object({
        phone: t.String({ pattern: '^[0-9]{10,16}$', default: '79251234567' }),
      }),
      detail: {tags: ['accounts']},
      response: {
        200: t.Object({
          data: t.Object({
            code: t.Number({ enum: [1234] }), // ONLY FOR DEV MODE. SHOULD BE DELETED IN PROD
          }),
        }),
        500: errorResponse500
      },
       
    })

    .post('/login', async ({ body: {code, phone}, jwtAccess, jwtRefresh }) => {

      // check with some api that sends sms service of code is ok
      // const codeFromApi = 1234;
      // if (code !== codeFromApi) throw new Forbidden('code is not correct')

      const [user] = await db.select().from(usersTable).where(eq(usersTable.phone, phone))
      if (!user) throw new NotFoundError('Not find user');

      const accessToken = await jwtAccess.sign({ id: user.id, role: user.role || "user", ban: user.ban })
      const refreshToken = await jwtRefresh.sign({ id: user.id, role: user.role || "user", ban: user.ban })
      
      // Save the refresh token in your database along with the user's ID and expiration date
      // const expiresAt = new Date(Date.now() + 2592000000); // 30 days in the future
      // should insert refresh as encrypted value to db then to look if it exists and user can refresh access token

      return { data: {accessToken: accessToken, refreshToken: refreshToken} };
    }, 
    {
      body: t.Object({
        code: t.Number({ pattern: '^[0-9]{4}$', default: '1234' }),
        phone: t.String({ pattern: '^[0-9]{10,16}$', default: '79251234567' }),
      }),
      detail: {
        tags: ['accounts']
      },
      response: {
        200: ResponseTokenSchema,
        400: t.Object({
          error: t.String({ enum: ['Invalid or expired code'] }),
        }),
        500: errorResponse500
      }
    }
    )


    // в общем-то несколько ручек в виду рефреш и разлогина можно добавить, но для теста не нужны они


    // .get('/tokenrefresh', async ({ Login, jwtAccess, jwtRefresh, request: { headers } }) => {
      
    // },
    // {
    //   detail: {
    //     tags: ['accounts'],
    //   },
    //   response: {
    //     200: ResponseTokenSchema,
    //     401: errorResponse401,
    //   }
    // }
    // )

    // .use(isAuthenticated)
    // .get('/unlogin', async ({ headers, jwtRefresh, cookie: { authorization } }) => {
      
    // },
    // {
    //   detail: {
    //     tags: ['accounts'],
    //     // description: 'this should be a description for what ?',
    //     security: [{ jwtAuth: [] }]
    //   },
    //   headers: t.Object({
    //     authorization: t.String({ default: 'YOUR_TOKEN', enum: ['YOUR_TOKEN']}) // Assuming 'authorization' header is required and of type string
    //   }),
    //   // ...headerParamer,
    //   response: {
    //     200: t.Object({}),
    //     401: errorResponse401
    //   }
    // }
    // )


)