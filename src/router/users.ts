import { Elysia, InternalServerError, NotFoundError, t } from 'elysia'
import { db } from '../db'
import { usersTable } from '../db/schema'
import { usersShemaSecureSwagger, usersShemaSwagger } from '../schemas/someOthers'
import { response200users, response201users, response202users, response204users } from '../schemas/usersSchemas'
import { errorResponse404, errorResponse500 } from '../schemas/errorShemas'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { eq } from 'drizzle-orm'


        
export const users = new Elysia()
    .group('/user', (app) =>
        app
            .get('/:id',  async ({ params: { id } }) => {
                const [data] = await db.select().from(usersTable).where(eq(usersTable.id, id))
                if (!data) throw new NotFoundError('Not find uid');
                return {data: data}
            },
            {   
                params: t.Object({
                    id: t.Any()
                }),
                transform({ params }) {
                    const id = +params.id

                    if(!Number.isNaN(id))
                        params.id = id
                },
                detail: usersShemaSwagger,
                response: {
                    200: response200users,
                    404: errorResponse404,
                    500: errorResponse500
                }
            })
            
            .post('', async ({body, set}) => {
                const [userId] = await db.insert(usersTable).values(body).returning({id: usersTable.id})
                if (!userId) throw new InternalServerError('bla bla bla')
                set.status = 201;
                return {data: userId}
            },
            {
                body: t.Object({
                    'name': t.String({maxLength: 30}),
                    'surname': t.String({maxLength: 30}),
                    'phone': t.String({maxLength: 20})
                }),
                detail: usersShemaSwagger,
                response: {
                    201: response201users,
                    500: errorResponse500
                }
            }
            )


            .use(isAuthenticated)
            .put('', async ({body, set, uid}) => {
                // const id = usersTable.id
                await db.update(usersTable).set(body).where(eq(usersTable.id, uid))
                set.status = 202;
                return 'OK'
            },
            {
                body: t.Object({
                    'name': t.String({ maxLength: 30 }),
                    'surname': t.String({ maxLength: 30 }),
                    'phone': t.String({maxLength: 20})
                }),
                detail: usersShemaSwagger,
                response: {
                    202: response202users,
                    500: errorResponse500
                }
            }
            )


            .patch('', async ({body, set, uid}) => {
                await db.update(usersTable).set(body).where(eq(usersTable.id, uid))
                set.status = 202;
                return 'OK'
            },
            {   
                body: t.Union([
                    t.Object({'name': t.String({ maxLength: 30 }) }),
                    t.Object({'surname': t.String({ maxLength: 30 }) }),
                    t.Object({'phone': t.String({maxLength: 20}) })
                ]),
                detail: usersShemaSecureSwagger,
                response: {
                    202: response202users,
                    500: errorResponse500
                }
            }
            )


            .delete('', async ({set, uid}) => {
                await db.delete(usersTable).where(eq(usersTable.id, uid))
                set.status = 204;
                return 'OK'
            },
            {   
                detail: usersShemaSecureSwagger,
                response: {
                    204: response204users,
                    500: errorResponse500
                }
            }
            )


    )