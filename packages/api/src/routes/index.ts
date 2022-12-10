import { FastifyInstance } from 'fastify';
import { postRoutes } from './post.routes';
import { authRoutes } from './auth.routes';

export const registerRoutes = (app: FastifyInstance) => {
  postRoutes(app);
  authRoutes(app);
};
