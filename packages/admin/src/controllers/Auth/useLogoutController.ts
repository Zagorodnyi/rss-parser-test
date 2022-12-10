import { useNavigate } from 'react-router';
import { AuthService } from '../../services';
import { LogoutController } from './types';

export const useLogoutController = (): LogoutController => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (err: any) {
      console.log(err.response.data);
    }

    localStorage.removeItem('auth');
    navigate('/login');
  };

  return {
    logout,
  };
};
