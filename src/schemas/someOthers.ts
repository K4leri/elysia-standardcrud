import { DocumentDecoration } from "elysia";

export const usersShemaSecureSwagger: DocumentDecoration = {
    tags: ['users'],
    security: [{ jwtAuth: [] }]
}

export const usersShemaSwagger: DocumentDecoration = {
    tags: ['users'],
}

