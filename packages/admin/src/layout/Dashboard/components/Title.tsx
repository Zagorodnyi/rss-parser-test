import React, { FC } from 'react';

export const SidebarTitle: FC = () => {
  return (
    <div className="flex items-center justify-start mx-6 mt-10">
      <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
        Admin panel
      </span>
    </div>
  );
};
