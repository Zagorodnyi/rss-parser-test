import { FastifyInstance } from 'fastify';
import {
  CreatePostSchema,
  GetOnePostSchema,
  UpdatePostSchema,
  ListAllPostsSchema,
  DeletePostSchema,
} from '../schemas/post.schema';
import { PostController } from '../controllers';
import { AuthMiddleware } from '../middleware/auth';

export const postRoutes = (app: FastifyInstance) => {
  app.route({
    method: 'GET',
    url: '/post/:post_id',
    schema: GetOnePostSchema,
    handler: PostController.getOne,
  });

  app.route({
    method: 'GET',
    url: '/posts',
    schema: ListAllPostsSchema,
    handler: PostController.getAll,
  });

  app.route({
    method: 'POST',
    url: '/post',
    schema: CreatePostSchema,
    preHandler: AuthMiddleware.validateJWT,
    handler: PostController.create,
  });

  app.route({
    method: 'PUT',
    url: '/post/:post_id',
    schema: UpdatePostSchema,
    preHandler: AuthMiddleware.validateJWT,
    handler: PostController.update,
  });

  app.route({
    method: 'DELETE',
    url: '/post/:post_id',
    schema: DeletePostSchema,
    preHandler: AuthMiddleware.validateJWT,
    handler: PostController.delete,
  });
};
