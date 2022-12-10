import { getLogger } from 'log4js';
import { FastifyRequest, FastifyReply } from 'fastify';

import {
  PostPayload,
  PostIdParams,
  PostSearchQuery,
} from './post.types';
import { PostService } from '../../services';
import { BaseController, Status, WithParams } from '../../types';

const LOG = getLogger('PostController');

class PostControllerImpl extends BaseController {
  constructor() {
    super();
  }

  async getOne(
    req: FastifyRequest<WithParams<PostIdParams>>,
    reply: FastifyReply
  ) {
    const post = await PostService.getOnePost(req.params.post_id);

    return {
      status: Status.OK,
      post,
    };
  }

  async getAll(req: FastifyRequest<PostSearchQuery>, reply: FastifyReply) {
    const { posts, total, page } = await PostService.getAllPosts(req.query);

    return {
      status: Status.OK,
      posts,
      total,
      page,
    };
  }

  async create(req: FastifyRequest<PostPayload>, reply: FastifyReply) {
    const post = await PostService.createPost(req.body);

    LOG.info(`Post created! PostId: ${post.id}`);

    return {
      status: Status.OK,
      post,
    };
  }

  async delete(
    req: FastifyRequest<WithParams<PostIdParams>>,
    reply: FastifyReply
  ) {
    await PostService.deletePost(req.params.post_id);

    LOG.info(`Post has been deleted! PostId: ${req.params.post_id}`);

    return {
      status: Status.OK,
    };
  }

  async update(
    req: FastifyRequest<WithParams<PostIdParams> & PostPayload>,
    reply: FastifyReply
  ) {
    const post = await PostService.updatePost(req.body, req.params.post_id);

    LOG.info(`Post has been updated! PostId: ${req.params.post_id}`);

    return {
      status: Status.OK,
      post,
    };
  }
}

export const PostController = new PostControllerImpl();
