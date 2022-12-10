import { FastifyReply, FastifyRequest } from 'fastify';

interface BaseControllerResponse {
  status: string;
}

export abstract class BaseController {
  abstract getOne(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<BaseControllerResponse>;
  abstract getAll(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<BaseControllerResponse>;

  abstract create(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<BaseControllerResponse>;
  abstract update(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<BaseControllerResponse>;
  abstract delete(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<BaseControllerResponse>;
}
