import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LoginProps {
  onClose: () => void;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: any) => void;
  switchToSignup: () => void;
}

function Login({ onClose, setIsLoggedIn, setUser, switchToSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);
      onClose();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#18181B] p-8 rounded-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-black/30 border border-white/10 focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-black/30 border border-white/10 focus:outline-none focus:border-orange-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-md transition-colors mb-4"
          >
            Login
          </button>
          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={switchToSignup}
              className="text-orange-500 hover:text-orange-400"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;