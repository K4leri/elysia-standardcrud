import { boolean, serial, pgTable, varchar, pgEnum} from "drizzle-orm/pg-core";

// export const mySchema = pgSchema("");

export const roles = pgEnum('role', ['user', 'manager', 'admin'])


export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length: 30}).notNull(),
    phone: varchar('phone', {length: 20}).notNull(),
    surname: varchar('surname', {length: 30}).notNull(),
    ban: boolean('ban').default(false).notNull(),
    role: roles('role').default('user').notNull()
});







