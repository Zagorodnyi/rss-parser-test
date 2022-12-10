import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { AuthService } from '../../services';

export const useSessionController = () => {
  const navigate = useNavigate();
  const firstTimeout = useRef<NodeJS.Timer>();

  const validate = async () => {
    try {
      await AuthService.validateSession();
    } catch (err: any) {
      localStorage.removeItem('auth');
      navigate('/login');
    }

    setTimeout(validate, 30000);
  };

  useEffect(() => {
    if (!firstTimeout.current) {
      firstTimeout.current = setTimeout(validate, 10000);
    }
  }, []);

  return {
    valid: true,
  };
};
