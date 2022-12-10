export interface AuthInput {
  email: string;
  password: string;
}

export interface SearchParams {
  page?: number;
  limit?: number;
  sort?: 'asc' | 'desc';
  sortBy?: string;
  search?: string;
}

export interface EditablePost {
  title: string;
  author: string;
  contentSnippet: string;
  content: string;
  link: string;
  provider?: string;
}
