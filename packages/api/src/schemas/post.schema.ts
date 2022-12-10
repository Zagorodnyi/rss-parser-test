import { Type, Static } from '@sinclair/typebox';
import { ErrorResponsesSchema, JWSTokenSchema } from './common.schema';
import { PostProvider } from '@prisma/client'

export const PostPayloadSchema = Type.Strict(
  Type.Object({
    foreignId: Type.Optional(Type.String()),
    title: Type.String(),
    link: Type.String(),
    author: Type.String(),
    pubDate: Type.Optional(Type.String()),
    provider: Type.Optional(Type.Enum(PostProvider)),
    content: Type.String(),
    contentSnippet: Type.String(),
  })
);

export const PostSchema = Type.Strict(
  Type.Object({
    id: Type.Number(),
    title: Type.String(),
    link: Type.String(),
    author: Type.String(),
    pubDate: Type.String(),
    content: Type.String(),
    provider: Type.Enum(PostProvider),
    contentSnippet: Type.String(),
    isoDate: Type.String(),
  })
);

export const GetOnePostSchema = {
  headers: {
    Authorization: JWSTokenSchema,
  },
  params: {
    post_id: Type.Strict(Type.Number()),
  },

  response: {
    201: Type.Strict(
      Type.Object({
        status: Type.Literal('ok'),
        post: PostSchema,
      })
    ),
    ...ErrorResponsesSchema,
  },
};

export const ListAllPostsSchema = {
  headers: {
    Authorization: JWSTokenSchema,
  },
  querystring: Type.Object({
    page: Type.Optional(Type.Number({ minimum: 1 })),
    limit: Type.Optional(Type.Number({ minimum: 1 })),
    search: Type.Optional(Type.String()),
    sort: Type.Optional(
      Type.Enum({
        asc: 'asc',
        desc: 'desc',
      })
    ),
    sortBy: Type.Optional(
      Type.KeyOf(Type.Omit(PostSchema, ['content', 'contentSnippet']))
    ),
  }),
  response: {
    200: Type.Strict(
      Type.Object({
        status: Type.Literal('ok'),
        posts: Type.Optional(Type.Array(PostSchema)),
        page: Type.Number(),
        total: Type.Number(),
      })
    ),
    ...ErrorResponsesSchema,
  },
};

export const CreatePostSchema = {
  headers: {
    Authorization: JWSTokenSchema,
  },
  body: {
    post: PostPayloadSchema,
  },
  response: {
    201: Type.Strict(
      Type.Object({
        status: Type.Literal('ok'),
        post: PostSchema,
      })
    ),
    ...ErrorResponsesSchema,
  },
};

export const CreatePostsSchema = {
  headers: {
    Authorization: JWSTokenSchema,
  },
  body: Type.Strict(
    Type.Object({
      posts: Type.Array(PostPayloadSchema),
    })
  ),
  response: {
    201: Type.Strict(
      Type.Object({
        status: Type.Literal('ok'),
        post: PostSchema,
      })
    ),
    ...ErrorResponsesSchema,
  },
};

export const UpdatePostSchema = {
  headers: {
    Authorization: JWSTokenSchema,
  },
  params: {
    post_id: Type.Strict(Type.Number()),
  },
  body: PostPayloadSchema,
  response: {
    200: Type.Strict(
      Type.Object({
        status: Type.Literal('ok'),
        post: PostSchema,
      })
    ),
    ...ErrorResponsesSchema,
  },
};

export const DeletePostSchema = {
  headers: {
    Authorization: JWSTokenSchema,
  },
  params: {
    post_id: Type.Strict(Type.Number()),
  },
  response: {
    200: Type.Strict(
      Type.Object({
        status: Type.Literal('ok'),
      })
    ),
    ...ErrorResponsesSchema,
  },
};

export type PostType = Omit<Static<typeof PostSchema>, 'pubDate'> & {
  pubDate: Date;
};
export type PostPayloadType = Static<typeof PostPayloadSchema>;
