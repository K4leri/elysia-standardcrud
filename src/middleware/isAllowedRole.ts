import { Elysia} from "elysia";
import { isAuthenticated } from "./isAuthenticated";
import { Forbidden } from "../utils/errorExtender";


// не стал выносить классы Forbidden и Unauthorized в отедльный файл, хотя надо бы


export const checkUserRole = (app: Elysia) =>
  app
    .use(isAuthenticated) // => give me role and other variables
    .onBeforeHandle(({ role }) => {
        if (!['admin', 'manager'].includes(role)) throw new Forbidden('Access denied. You are not authorized to perform this action.')
    });


