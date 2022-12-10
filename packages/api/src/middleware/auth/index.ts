import jwt from 'jsonwebtoken';
import { getLogger } from 'log4js';
import { FastifyRequest } from 'fastify';

import { NotAuthorizedError } from '../errors/customErrors';
import { AuthService } from '../../services/auth/auth.service';
import { TenantTokenData, TokenData } from '../../types/userTypes';

const LOG = getLogger('AuthMiddleware');

export class AuthMiddleware {
  static async validateJWT(req: FastifyRequest) {
    const token = req.headers.authorization;

    if (!token) {
      throw NotAuthorizedError('Not valid token');
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET) as TokenData;

      const isValid = await AuthService.validateSession(payload.sid);

      if (!isValid) {
        throw new Error();
      }

      req.context.userId = payload.userId;
    } catch (err) {
      LOG.debug(`Auth error. Token is not valid. Ip: ${req.ip} `);
      throw NotAuthorizedError('Not valid token');
    }
  }
}
