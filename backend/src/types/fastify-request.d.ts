import 'fastify'
import JWTPayload from 'src/dtos/payload/jwt.payload'

declare module 'fastify' {
  interface FastifyRequest {
    user?: JWTPaylocoad
  }
}
