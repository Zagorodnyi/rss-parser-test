import { AxiosError } from 'axios';

export type QueryError = AxiosError<{ message: string; code: string }>;

export type BasicTypes =
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export function isTypeGuard<T extends Record<string, any>>(
  obj: unknown,
  memberName: keyof T,
  memberExpectedType: BasicTypes,
  memberExpectedValue: unknown
): obj is T {
  return (
    typeof (obj as T)[memberName] === memberExpectedType &&
    (obj as T)[memberName] === memberExpectedValue
  );
}
