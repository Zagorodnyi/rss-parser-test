import { PostProvider, PrismaClient } from '@prisma/client';

import { NotFoundError } from '../../middleware/errors/customErrors';
import { PostPayloadType, PostType } from '../../schemas/post.schema';
import { FindAllResponse, RequestQueryParams } from '../../types';

class PostServiceImpl {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getOnePost(postId: number): Promise<PostType> {
    const post = await this.db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw NotFoundError('Post Not found');
    }

    return {
      ...post,
      isoDate: post.pubDate.toISOString(),
    };
  }

  async getAllPosts(
    queryOptions: RequestQueryParams<PostType, 'content' | 'contentSnippet'>
  ): Promise<FindAllResponse<{ posts: PostType[] | null }>> {
    const {
      search,
      page = 1,
      limit = 15,
      sort = 'asc',
      sortBy = 'id',
    } = queryOptions;

    const where = search
      ? {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              content: {
                contains: search,
              },
            },
          ],
        }
      : {};

    const total = await this.db.post.count({
      where,
    });

    const posts = await this.db.post.findMany({
      take: limit,
      skip: limit * (page - 1),
      where,
      orderBy: [
        {
          [sortBy]: sort,
        },
      ],
    });

    return {
      total: Math.ceil(total / limit),
      page,
      limit,
      posts: posts?.map((post) => ({
        ...post,
        isoDate: post.pubDate.toISOString(),
      })),
    };
  }

  async createPost(payload: PostPayloadType) {
    const pubDate = payload.pubDate
      ? new Date(Number(payload.pubDate))
      : new Date();

    const data = {
      ...payload,
      pubDate,
      provider: PostProvider.ORIGIN
    };

    const post = await this.db.post.create({
      data,
    });

    return post;
  }

  async updatePost(payload: PostPayloadType, postId: number) {
    const pubDate = payload.pubDate
      ? new Date(Number(payload.pubDate))
      : new Date();

    const data = {
      ...payload,
      pubDate,
    };

    const post = await this.db.post.update({
      data,
      where: {
        id: postId,
      },
    });

    return {
      ...post,
      isoDate: post.pubDate.toISOString(),
    };
  }

  async deletePost(postId: number) {
    const post = await this.db.post.delete({
      where: {
        id: postId,
      },
    });

    return post;
  }
}

export const PostService = new PostServiceImpl(new PrismaClient());
