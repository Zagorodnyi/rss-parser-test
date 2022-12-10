import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { SubmitHandler } from 'react-hook-form';

import { QueryError } from '@common/types';
import { AuthService } from '../../services';
import { LoginController, LoginDataInput } from './types';

export const useLoginController = (): LoginController => {
  const navigate = useNavigate();

  const mutation = useMutation((data: LoginDataInput) =>
    AuthService.login(data)
  );

  const login: SubmitHandler<LoginDataInput> = (data) => {
    mutation.mutate(data);
  };

  if (mutation.isSuccess) {
    navigate('/dashboard');
  }

  return {
    login,
    loading: mutation.isLoading,
    error: mutation.error as QueryError,
  };
};
