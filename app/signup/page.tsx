'use client';

import { useState } from 'react';
import { login, signup } from '../api/auth-apis';
import toast from 'react-hot-toast';
import { dispatch } from '@/redux/store';
import { setAuth } from '@/redux/slices/auth-slice';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const res = await signup(email, password);
    if (!res?.status) {
      toast.error('Error while signing up');
    } else {
      dispatch(setAuth(res.data));
      router.replace('/');
    }
  };

  return (
    <div className='w-full h-screen flex'>
      <form
        onSubmit={handleLogin}
        className='bg-stone-700 m-auto flex text-white flex-col sm:w-[400px] w-full p-5 rounded-xl justify-center gap-2 text-foreground'
      >
        <Link href='/'>
          <h1 className='text-[40px] text-center font-bold cursor-pointer '>
            W2 Form Assistant
          </h1>
        </Link>
        <label htmlFor='email'>Email</label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-6'
          value={email}
          name='email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          placeholder='you@example.com'
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-6'
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='••••••••'
          required
        />
        <button type='submit' className='w-full bg-yellow-500 rounded-md p-2'>
          Sign Up
        </button>
        <Link href='/login'>
          <div className='w-full text-center bg-stone-950 rounded-md p-2'>
            Login
          </div>
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
