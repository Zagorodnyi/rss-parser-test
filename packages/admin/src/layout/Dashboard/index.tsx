import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Redirect } from '../Redirect';
import { SidebarTitle } from './components';
import { SidebarLink } from './components/Link';
import { PostIcon, LogoutIcon } from './components/Icons';
import { useLogoutController, useSessionController } from '../../controllers/Auth';

export const DashboardLayout: FC = () => {
  useSessionController();
  const { logout } = useLogoutController();

  if (!localStorage.getItem('auth')) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="flex relative overflow-hidden">
      <div className="relative bg-white dark:bg-gray-800 max-w-[300px] z-[1999]">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="h-screen w-72">
            <SidebarTitle />
            <nav className="mt-10 px-6 ">
              <SidebarLink to="posts" title="Posts" icon={<PostIcon />} />
            </nav>
            <div className="absolute bottom-0 my-10 w-full" onClick={logout}>
              <div className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8 cursor-pointer">
                <LogoutIcon />
                <span className="mx-4 font-medium">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-scroll w-full h-screen">
        <Outlet />
      </div>
    </div>
  );
};
