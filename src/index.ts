import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { users } from "./router/users";
import { errorPlugin } from "./middleware/errorhandler";
import { account } from "./router/account";

const app = new Elysia()
  .use(swagger())
  .use(errorPlugin)
  .use(account)
  .use(users)
  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
console.log(
  `openApi at ${app.server?.hostname}:${app.server?.port}/swagger`
);
