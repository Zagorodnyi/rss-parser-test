import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const CenteredLayout: FC = () => {
  return (
    <div className="w-screen h-screen grid place-items-center dark:bg-gray-700">
      <Outlet />
    </div>
  );
};
