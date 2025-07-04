import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { setShowLogin, axios, setToken, fetchUser } = useAppContext();
  const navigate = useNavigate();

  const [state, setState] = useState('login'); // login or register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        // Store token
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        toast.success(data.message || `${state === 'login' ? 'Logged in' : 'Registered'} successfully`);

        // Fetch user info (role etc.)
        await fetchUser();

        // Close login modal and redirect
        setShowLogin(false);
        navigate('/');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Login failed');
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
        className="bg-white rounded-xl shadow-md w-[350px] px-6 py-8 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">
          <span className="text-blue-600">User</span> {state === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        {state === 'register' && (
          <div className="w-full">
            <label className="text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="Enter name"
              required
            />
          </div>
        )}

        <div className="w-full">
          <label className="text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="w-full">
          <label className="text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="Enter password"
            required
          />
        </div>

        <p className="text-sm">
          {state === 'register' ? (
            <>
              Already have an account?{' '}
              <span className="text-blue-600 cursor-pointer" onClick={() => setState('login')}>
                Click here
              </span>
            </>
          ) : (
            <>
              Create an account?{' '}
              <span className="text-blue-600 cursor-pointer" onClick={() => setState('register')}>
                Click here
              </span>
            </>
          )}
        </p>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          {state === 'register' ? 'Create Account' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
