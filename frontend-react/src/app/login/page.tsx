'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail } from '@/utils/validation';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    const toastId = toast.loading('Logging in...');
    // if (!validateEmail(email)) {
    //   toast.dismiss(toastId); 
    //   return;
    // }

    try {
      console.log('response');

      const response = await fetch(`${SERVER_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: email, password: password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      if(!data.success){
        throw new Error(data.message || 'Login failed');
      }
      // Cookies.set('accessToken', data.accessToken);
      // Cookies.set('refreshToken', data.refreshToken);
      // Cookies.set('role', data.role);
      // Cookies.set('name', data.name);
      console.log(data);
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('role', data.data.role);
      localStorage.setItem('name', data.data.name);
      toast.success('Login Successful!', { id: toastId });
      login();
    } catch (error) {
      toast.error('Login Failed', { id: toastId });
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <section className="container p-5 signinbox shadow-lg">
        <div className="row">
          <div className="col-md-6">
            <img src="/image/logo.png" className="h-16 d-inline-block align-text-top " />
            <h1 className="heading-text mt-4">Sign in</h1>
            <h4 className="text my-3">Login into account</h4>
          </div>
          <div className="col-lg-6">
            <form className="mt-4 mb-2">
              <div className="mb-3">
                <label htmlFor="signin_email" className="form-label heading-text h5">Email address</label>
                <input type="email" className="form-control text" id="signin_email" placeholder="stepneysharma@gehu.ac.in" value={email} onChange={e => setEmail(e.target.value)} />
                <div className="form-text text">We'll never share your email with anyone else.🤞🏼</div>
              </div>
              <div className="mb-2">
                <label htmlFor="signin_InputPassword" className="form-label heading-text h5">Password</label>
                <input type="password" className="form-control" id="signin_InputPassword" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="my-2">
                <label className="text-danger text fw-bold" id="signin_error"> </label>
              </div>
              <button
                type="button"
                className="btn btn-danger rounded-pill px-4 py-2 fw-bold heading-text"
                id="login"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}