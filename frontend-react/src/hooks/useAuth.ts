import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNotificationStore } from '@/store/notificationStore';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const addNotification = useNotificationStore(state => state.addNotification);

  useEffect(() => {
    const validateCookie = async () => {
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        if (!Cookies.get('accessToken')) {
          try {
            const response = await fetch(`${SERVER_URL}/user/refresh-token`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
              },
              body: JSON.stringify({ refreshToken }),
            });
            if (!response.ok) {
              throw new Error('Error in fetching new access token');
            }
            setIsLoggedIn(true);
          } catch (error) {
            addNotification({ title: 'Login Failed', description: '', color: 'info' });
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    validateCookie();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    window.location.href = '/';
  };

  const logout = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      await fetch(`${SERVER_URL}/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('role');
    Cookies.remove('name');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return { isLoggedIn, login, logout };
}