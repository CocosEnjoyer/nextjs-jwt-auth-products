'use client';
import InitUser from '../InitUser/InitUser';
import { User } from '@/types/user';

export const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  return (
    <>
      <InitUser user={user} />

      {children}
    </>
  );
};
