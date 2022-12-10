import React, { FC } from 'react';
import { useParams } from 'react-router';

import { PostForm } from './PostForm';
import { usePostController } from '../../controllers/Post/usePostController';

export const UpdatePost: FC = () => {
  const params = useParams<{ postId: string }>();

  const { deletePost, updatePost, post, loading, error } = usePostController({
    postId: Number(params.postId),
    onSuccessRedirect: '/dashboard/posts',
  });

  if (loading) {
    return <p>Loading post</p>;
  }

  if (error) {
    return <p>{error.response?.data.message}</p>;
  }

  if (!post) {
    return null;
  }

  return (
    <PostForm
      action="update"
      post={post}
      onDelete={deletePost}
      onSubmit={updatePost}
    />
  );
};

export const CreatePost: FC = () => {
  const { createPost } = usePostController({
    onSuccessRedirect: '/dashboard/posts',
  });

  return <PostForm action="create" onSubmit={createPost} />;
};
