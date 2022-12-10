import { FastifyReply, FastifyRequest } from 'fastify';

import { WithPayloadBody } from '../../types';
import { LoginPayload, RegisterPayload } from './types';
import { AuthService } from '../../services/auth/auth.service';

class AuthControllerImpl {
  async login(
    req: FastifyRequest<WithPayloadBody<LoginPayload>>,
    reply: FastifyReply
  ) {
    const response = await AuthService.login(req.body);

    return response;
  }

  async logout(req: FastifyRequest) {
    await AuthService.logout(req.context.userId, req.context.sid);

    return { status: 'ok' };
  }

  async register(req: FastifyRequest<WithPayloadBody<RegisterPayload>>) {
    const response = await AuthService.register(req.body);

    return response;
  }

  async check(req: FastifyRequest<WithPayloadBody<RegisterPayload>>) {
    return { status: 'ok' };
  }
}

export const AuthController = new AuthControllerImpl();
