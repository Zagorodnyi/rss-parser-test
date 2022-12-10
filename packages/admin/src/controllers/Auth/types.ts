import { QueryError } from '@common/types';
import { SubmitHandler } from 'react-hook-form';

export interface LoginDataInput {
  email: string;
  password: string;
}

export interface LoginController {
  login: SubmitHandler<LoginDataInput>;
  loading: boolean;
  error: QueryError;
}

export interface RegisterDataInput {
  email: string;
  password: string;
}

export interface RegisterController {
  register: SubmitHandler<RegisterDataInput>;
  error: QueryError;
  loading: boolean;
}

export interface LogoutController {
  logout: () => Promise<void>;
}
