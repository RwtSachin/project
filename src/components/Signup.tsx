import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SignupProps {
  onClose: () => void;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: any) => void;
  switchToLogin: () => void;
}

function Signup({ onClose, setIsLoggedIn, setUser, switchToLogin }: SignupProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');

  const ADMIN_CODE = 'FUSION2024'; // In a real app, this would be stored securely

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAdmin && adminCode !== ADMIN_CODE) {
      setError('Invalid admin code');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((u: any) => u.email === email)) {
      setError('Email already exists');
      return;
    }

    const newUser = { fullName,email, password, isAdmin };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoggedIn(true);
    onClose();
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
        <h2 className="text-2xl text-center text-[#F06F16] font-bold mb-6">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-black/30 border border-white/10 focus:outline-none focus:border-orange-500"
              placeholder="Enter your full name"
              required
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-black/30 border border-white/10 focus:outline-none focus:border-orange-500"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              value={cnfPassword}
              onChange={(e) => setCnfPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-black/30 border border-white/10 focus:outline-none focus:border-orange-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="rounded border-white/10 bg-black/30 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm font-medium">Sign up as admin</span>
            </label>
          </div>
          {isAdmin && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Admin Code</label>
              <input
                type="password"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-black/30 border border-white/10 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-md transition-colors mb-4"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={switchToLogin}
              className="text-orange-500 hover:text-orange-400"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;