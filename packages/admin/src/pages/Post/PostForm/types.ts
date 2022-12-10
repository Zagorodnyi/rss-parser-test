import { EditablePost } from '../../../services/types';

export interface CreatePostFormProps {
  action: 'create';
  onSubmit: (data: EditablePost) => void;
}

export interface UpdatePostFormProps {
  action: 'update';
  post: EditablePost;
  onSubmit: (data: EditablePost) => void;
  onDelete: () => void;
}

export type PostFormProps = CreatePostFormProps | UpdatePostFormProps;
