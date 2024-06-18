import type { Elysia} from "elysia";
import { jwtAccessSetup } from "../services/setup";
import { Unauthorized } from "../utils/errorExtender";


export const isAuthenticated = (app: Elysia) =>
  app
    .use(jwtAccessSetup)
    .derive(async function handler({ jwtAccess, headers: {authorization} }) {
      if (!authorization) throw new Unauthorized('Unauthorized');

      const payload = await jwtAccess.verify(authorization);
      if (!payload) throw new Unauthorized('Unauthorized');


      return { uid: payload.id, role: payload.role, ban: payload.ban 
      } as {
        uid: number; 
        role: 'admin' | 'user' | 'manager'; 
        ban: Boolean
      };
    })
    