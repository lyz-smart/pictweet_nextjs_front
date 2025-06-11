'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/context/AuthContext'

const AuthGuard = ({ children }:  { children: React.ReactNode }) => {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/users/login');
    }
  }, [isLoading]);

  if (!user) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
};

export default AuthGuard;