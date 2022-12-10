import { PostPayloadType, PostType } from '../../schemas/post.schema';
import {
  RequestQueryParams,
  WithPayloadBody,
  WithSearchQuery,
} from '../../types';

export interface PostIdParams {
  post_id: number;
}

export type PostSearchQuery = WithSearchQuery<
  RequestQueryParams<PostType, 'content' | 'contentSnippet'>
>;

export type PostPayload = WithPayloadBody<PostPayloadType>;
