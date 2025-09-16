import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
}
