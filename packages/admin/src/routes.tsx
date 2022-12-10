import { createBrowserRouter } from 'react-router-dom';

import { PostsList } from './pages/Posts';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CreatePost, UpdatePost } from './pages/Post';
import { CenteredLayout, DashboardLayout, Redirect } from './layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Redirect to="/dashboard" />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: '',
        element: (
          <div className="h-full flex items-center">
            <p className="mx-auto text-xl">👋 Select a collection from sidebar</p>
          </div>
        ),
      },
      {
        path: 'posts',
        errorElement: <h1>Error</h1>,
        element: <PostsList />,
      },
      {
        path: 'posts/:postId',
        errorElement: <h1>Error</h1>,
        element: <UpdatePost />,
      },
      {
        path: 'posts/create',
        errorElement: <h1>Error</h1>,
        element: <CreatePost />,
      },
    ],
  },
  {
    path: '/',
    element: <CenteredLayout />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: 'login',
        errorElement: <h1>Error</h1>,
        element: <LoginPage />,
      },
      {
        path: 'register',
        errorElement: <h1>Error</h1>,

        element: <RegisterPage />,
      },
    ],
  },
]);
