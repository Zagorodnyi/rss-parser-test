import { z } from 'zod';

import { QueryError } from '@common/types';
import { SortDirection } from '@ui/table/types';
import { EditablePost } from '../../services/types';

export const EditablePostSchema = z.object({
  title: z.string().min(5).max(500),
  author: z.string().min(2).max(100),
  contentSnippet: z.string().min(20),
  content: z.string().min(50),
  link: z.string().min(10),
});

export interface PostController {
  updatePost: (data: EditablePost) => void;
  deletePost: () => void;
  createPost: (data: EditablePost) => void;
  post?: Post;
  loading: boolean;
  error?: QueryError | null;
}
export interface PostControllerProps {
  postId?: number;
  onSuccessRedirect: string;
}

export interface PostsController {
  handleSort: (sortBy: string, sortDir: SortDirection) => void;
  handleSearch: (search: string) => void;
  handlePageChange: (nextPage: number) => void;
  meta: {
    totalPages: number;
    currentPage: number;
    currentSort?: SortDirection;
    curentSortBy?: string;
    currentSearch?: string;
  };
  posts?: Post[];
  loading: boolean;
  error: QueryError | null;
}

export interface Post {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  contentSnippet: string;
  provider: string;
  id: string;
  isoDate: string;
}

export interface PostsQueryResponse {
  posts: Post[];
  page: number;
  total: number;
  status: 'ok';
}

export interface PostQueryResponse {
  post: Post;
  page: number;
  total: number;
  status: 'ok';
}
