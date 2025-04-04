import React, { useState } from 'react';

interface AdminSignupProps {
  onClose: () => void;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: any) => void;
}

function AdminSignup({ onClose, setIsLoggedIn, setUser }: AdminSignupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to verify admin credentials
    // For now, we'll simulate a successful signup
    const newUser = {
      email,
      isAdmin: true
    };
    
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoggedIn(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#2a1515] p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Admin Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-black/30 border border-white/10 focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-black/30 border border-white/10 focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="adminCode" className="block text-sm font-medium mb-1">
              Admin Code
            </label>
            <input
              type="text"
              id="adminCode"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-black/30 border border-white/10 focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-md border border-white/10 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;