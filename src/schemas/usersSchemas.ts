import { t } from "elysia";
import { createInsertSchema } from 'drizzle-typebox'
import { usersTable } from "../db/schema";



// короче убрал через drizzle typebox. Тут оказывает баг поймал, сам того не подозревая подобным
const getUser = createInsertSchema(usersTable)



export const response200users = t.Object({
    data: getUser,
});

const userId = t.Object({
    data: t.Object({
        id: t.Number()
    })
})

export const response201users = t.Union([
    t.String({enum: 'OK'}),
    userId
])

export const response202users = t.Union([
    t.String({enum: 'OK'}),
    userId
])


export const response204users = t.Union([
    t.String({enum: 'OK'}),
    userId
])