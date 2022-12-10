import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import {
  RegisterDataInput,
  useRegisterController,
} from '../../controllers/Auth';

export const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterDataInput>();
  const { register: registerHandler } = useRegisterController();

  return (
    <form onSubmit={handleSubmit(registerHandler)}>
      <div className="flex flex-col mb-2">
        <div className=" relative ">
          <input
            type="email"
            id="create-account-email"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            {...register('email')}
            placeholder="Email"
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <div className=" relative ">
          <input
            type="password"
            id="create-account-email"
            {...register('password')}
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            placeholder="Password"
          />
          <FieldError message={errors.password?.message} />
        </div>
      </div>
      <div className="flex w-full my-4">
        <button
          type="submit"
          className="py-2 px-4  bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 focus:ring-offset-teal-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Register
        </button>
      </div>
    </form>
  );
};

const FieldError: FC<{ message?: string }> = (props) => {
  return props.message ? (
    <p className="text-red-500 text-xs py-1">{props.message}</p>
  ) : null;
};
