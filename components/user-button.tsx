import { logout } from '@/app/api/login/route';
import { resetAuth } from '@/redux/slices/auth-slice';
import { dispatch } from '@/redux/store';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const UserButton = () => {
  const user = useSelector((state: any) => state.Auth.user);
  const handleLogout = async () => {
    await logout();
    dispatch(resetAuth());
  };
  return (
    <div className='fixed top-0 right-0 p-5'>
      {user ? (
        <div className='flex gap-2 items-center'>
          <p>{user.email}</p>
          <button
            onClick={handleLogout}
            className='bg-yellow-600 px-4 py-2 rounded-lg'
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href={'/login'}>
          <div className='bg-yellow-600 px-4 py-2 rounded-lg'>Login</div>
        </Link>
      )}
    </div>
  );
};

export default UserButton;
