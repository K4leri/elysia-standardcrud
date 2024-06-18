import { Elysia } from "elysia";

const errorStatusMap = {
  'BadRequest': 400,
  'Unauthorized': 401,
  // 'VALIDATION': 403,
  'Forbidden': 403,
  'NOT_FOUND': 404,
  'Conflict_error': 409,
  'INTERNAL_SERVER_ERROR': 500,
  'UNKNOWN': 505,
  'PARSE': 506,
  'INVALID_COOKIE_SIGNATURE': 507
};

export const errorPlugin = new Elysia()
  .onError(({ code, error, set}) => {
    console.log(code)
    set.status = errorStatusMap[code as keyof typeof errorStatusMap] ?? 500

    console.log(error)
    return {error: error.toString()}
  })