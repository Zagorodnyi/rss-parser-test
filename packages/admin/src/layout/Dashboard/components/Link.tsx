import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface SideparLinkProps {
  to: string;
  title: string;
  icon: React.ReactNode;
}

export const SidebarLink: FC<SideparLinkProps> = (props) => {
  const { to, title, icon } = props;

  return (
    <NavLink
      className={(state) => {
        return `${
          state.isActive ? 'border-r-2 border-teal-400' : ''
        } flex my-6`;
      }}
      to={to}
    >
      <div className="w-full p-2 hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ">
        {icon}
        <span className="mx-4 text-lg font-normal flex-grow">{title}</span>
      </div>
    </NavLink>
  );
};
