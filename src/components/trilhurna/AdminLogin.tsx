'use client';

import { useState } from 'react';
import { useAdminAuth } from '@/hooks/trilhurna/useAdminAuth';

export const AdminLogin = () => {
  const { login, logout, isAdmin, loading, error } = useAdminAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    
    setIsLoggingIn(true);
    await login(email, password);
    setIsLoggingIn(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎉 Admin Logged In
          </h2>
          <p className="text-gray-600 mb-6">
            You can now create and manage polls.
          </p>
          <button
            onClick={logout}
            className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🔐 Admin Login
        </h2>
        <p className="text-gray-600 mb-6">
          Login with your Firebase account to access admin features.
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your-email@domain.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoggingIn}
            className={`w-full font-bold py-3 px-4 rounded transition duration-200 ${
              isLoggingIn
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>Note: You need to be added as an admin in Firestore.</p>
          <p>Contact the system administrator to get access.</p>
        </div>
      </div>
    </div>
  );
}; 