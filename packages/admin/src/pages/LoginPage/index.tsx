import React, { FC, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { LoginForm } from './Form';

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
        Log In
      </div>
      <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
        Don't have an account?
        <NavLink
          to="/register"
          className="text-sm text-blue-500 underline hover:text-blue-700 pl-1"
        >
          Sign up
        </NavLink>
      </span>
      <div className="p-6 mt-8">
        <LoginForm />
      </div>
    </div>
  );
};
