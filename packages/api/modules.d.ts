import fastify from 'fastify';

declare module 'fastify' {
  interface FastifyContext {
    userId: number;
    tenantId?: string;
    sid: string;
  }
}
