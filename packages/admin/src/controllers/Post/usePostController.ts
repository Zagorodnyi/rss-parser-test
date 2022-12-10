import { useNavigate } from 'react-router';
import { useMutation, useQuery } from 'react-query';

import {
  PostController,
  PostQueryResponse,
  EditablePostSchema,
  PostControllerProps,
} from './types';
import { QueryError } from '@common/types';
import { PostService } from '../../services';
import { EditablePost } from '../../services/types';

export const usePostController = ({
  postId,
  onSuccessRedirect,
}: PostControllerProps): PostController => {
  const navigate = useNavigate();

  const createMutation = useMutation((data: EditablePost) =>
    PostService.createOne(data)
  );

  const handleCreate = async (data: EditablePost) => {
    const post = EditablePostSchema.parse(data);

    try {
      await createMutation.mutateAsync(post);

      navigate(onSuccessRedirect);
    } catch (err) {
      console.error(err);
    }
  };

  const { data, isLoading, error } = useQuery<PostQueryResponse, QueryError>(
    ['post', postId],
    () => {
      if (!postId) {
        return Promise.reject('No postId variable');
      }

      return PostService.getOneById(postId);
    }
  );

  const updateMutation = useMutation((data: EditablePost) => {
    if (!postId) {
      return Promise.reject();
    }

    return PostService.updateById(data, postId);
  });

  const deleteMutation = useMutation(() => {
    if (!postId) {
      return Promise.reject('No postId variable');
    }
    return PostService.deleteById(postId);
  });

  const handleUpdate = async (data: EditablePost) => {
    const post = EditablePostSchema.parse(data);

    try {
      await updateMutation.mutateAsync(post);

      navigate(onSuccessRedirect);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();

      navigate(onSuccessRedirect);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    error: error,
    post: data?.post,
    loading: isLoading,
    updatePost: handleUpdate,
    createPost: handleCreate,
    deletePost: handleDelete,
  };
};
