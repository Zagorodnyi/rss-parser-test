import React, { FC } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Controller, useForm } from 'react-hook-form';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { isTypeGuard } from '@common/types';
import { EditablePost } from '../../../services/types';
import { PostFormProps, UpdatePostFormProps } from './types';

const getUpdateProps = (props: PostFormProps) => {
  if (isTypeGuard<UpdatePostFormProps>(props, 'action', 'string', 'update')) {
    return {
      post: props.post,
      onDelete: props.onDelete,
    };
  }

  return {
    post: undefined,
    onDelete: () => {},
  };
};

export const PostForm: FC<PostFormProps> = (props) => {
  const { onSubmit, action } = props;
  const { post, onDelete } = getUpdateProps(props);

  const { control, handleSubmit, setValue, register } = useForm<EditablePost>({
    defaultValues: post,
  });

  return (
    <section className="min-h-screen py-5 w-full bg-gray-100/50 flex items-center">
      <form
        className="container max-w-full mx-auto shadow-md md:w-3/4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-4 border-t-2 border-teal-600 rounded-lg bg-gray-100/5 ">
          <h1 className="text-gray-600 text-xl">
            {action === 'create' ? 'Create post' : 'Edit post'}
          </h1>
        </div>

        <div className="space-y-6 bg-white">
          {post?.provider && (
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Post provider</h2>
              <div className="max-w-sm mx-auto md:w-2/3">
                <div className=" relative ">
                  <p>{post?.provider}</p>
                </div>
              </div>
            </div>
          )}

          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Title</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div className=" relative ">
                <input
                  {...register('title')}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  placeholder="Title"
                />
              </div>
            </div>
          </div>

          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Author</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div className=" relative ">
                <input
                  {...register('author')}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  placeholder="Title"
                />
              </div>
            </div>
          </div>
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Link</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div className=" relative ">
                <input
                  {...register('link')}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  placeholder="Title"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:space-y-0">
            <h2 className="mx-auto py-2">Content Snippet</h2>
            <div className="max-w-full mx-auto">
              <div className=" relative ">
                <Controller
                  control={control}
                  render={({ field }) => (
                    <CKEditor
                      {...field}
                      data={post?.contentSnippet}
                      onChange={(value, editor) => {
                        setValue('contentSnippet', editor.getData());
                      }}
                      editor={ClassicEditor}
                    />
                  )}
                  name="contentSnippet"
                  rules={{ required: 'Content Snippet Field is required' }}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:space-y-0">
            <h2 className="mx-auto py-2">Content</h2>
            <div className="max-w-full mx-auto">
              <div className=" relative ">
                <Controller
                  control={control}
                  render={({ field }) => (
                    <CKEditor
                      {...field}
                      data={post?.content}
                      onChange={(_value, editor) => {
                        setValue('content', editor.getData());
                      }}
                      editor={ClassicEditor}
                    />
                  )}
                  name="contentSnippet"
                  rules={{ required: 'Content Field is required' }}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="w-full px-4 pb-4 justify-around flex gap-4 text-gray-500">
            {action === 'update' ? (
              <button
                type="button"
                onClick={onDelete}
                className="py-2 px-4 md:w-min bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Delete
              </button>
            ) : null}
            <button
              type="submit"
              className="py-2 px-4 md:w-min bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
