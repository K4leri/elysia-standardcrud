import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";


export const jwtAccessSetup = new Elysia()
.use(
  jwt({
    name: "jwtAccess",
    schema: t.Object({
        id: t.Number(),
        role: t.String(),
        ban: t.Boolean()
    }),
    secret: process.env.ACCESS_SECRET as string,
    exp: '1d',
  })
);

export const jwtRefreshSetup = new Elysia()
.use(
  jwt({
    name: "jwtRefresh",
    schema: t.Object({
        id: t.Number(),
        role: t.String(),
        ban: t.Boolean()
    }),
    secret: process.env.REFRESH_SECRET as string,
    exp: '7d',
  })
);