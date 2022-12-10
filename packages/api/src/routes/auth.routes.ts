import { FastifyInstance } from 'fastify';
import {
  LoginSchema,
  LogoutSchema,
  RegisterSchema,
} from '../schemas/auth.schema';
import { AuthController } from '../controllers';
import { AuthMiddleware } from '../middleware/auth';

export const authRoutes = (app: FastifyInstance) => {
  app.route({
    method: 'POST',
    url: '/auth/login',
    schema: LoginSchema,
    handler: AuthController.login,
  });

  app.route({
    method: 'POST',
    url: '/auth/register',
    schema: RegisterSchema,
    handler: AuthController.register,
  });

  app.route({
    method: 'POST',
    url: '/auth/logout',
    schema: LogoutSchema,
    preHandler: AuthMiddleware.validateJWT,
    handler: AuthController.logout,
  });

  app.route({
    method: 'POST',
    url: '/auth/check',
    schema: LogoutSchema,
    preHandler: AuthMiddleware.validateJWT,
    handler: AuthController.check,
  });
};
