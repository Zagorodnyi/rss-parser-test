import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { SubmitHandler } from 'react-hook-form';

import { QueryError } from '@common/types';
import { AuthService } from '../../services';
import { RegisterController, RegisterDataInput } from './types';

export const useRegisterController = (): RegisterController => {
  const navigate = useNavigate();

  const mutation = useMutation((data: RegisterDataInput) =>
    AuthService.register(data)
  );

  const register: SubmitHandler<RegisterDataInput> = (data) => {
    mutation.mutate(data);
  };

  if (mutation.isSuccess) {
    navigate('/login');
  }

  return {
    register,
    loading: mutation.isLoading,
    error: mutation.error as QueryError,
  };
};
