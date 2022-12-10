export * from './errorCodes';
export * from './abstractController';

export type SortOptions = 'asc' | 'desc';
export type SortByOptions<
  T extends Record<string, unknown>,
  O extends string = ''
> = keyof Omit<T, O>;

export interface RequestQueryParams<
  S extends Record<string, unknown>,
  O extends keyof S
> {
  search?: string;
  page?: number;
  limit?: number;
  sort?: SortOptions;
  sortBy?: SortByOptions<S, O extends string ? O : never>;
}

export type FindAllResponse<T> = {
  total: number;
  page: number;
  limit: number;
} & T;

export interface ContextInterface {
  userId: number;
}

export interface WithParams<T> {
  Params: T;
}
export interface WithSearchQuery<T> {
  Querystring: T;
}

export interface WithPayloadBody<T> {
  Body: T;
}

export enum Status {
  OK = 'ok',
}
