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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-VerdeMenta"></div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="max-w-md mx-auto p-4 bg-Branco rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 font-spaceGrotesk">
            Logged in as admin
          </div>
          <button
            onClick={logout}
            className="text-xs text-gray-400 hover:text-red-500 transition duration-300 font-spaceGrotesk"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-Branco rounded-lg shadow-sm border border-gray-100">
      <div className="text-center">
        <h2 className="text-xl font-bold text-AzulMeiaNoite mb-3 font-poppins">
          Admin Login
        </h2>
        <p className="text-gray-600 mb-6 font-spaceGrotesk text-sm">
          Login with your Firebase account to access admin features.
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2 font-poppins">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-VerdeMenta focus:border-VerdeMenta transition duration-200 text-sm"
              placeholder="your-email@domain.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2 font-poppins">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-VerdeMenta focus:border-VerdeMenta transition duration-200 text-sm"
              placeholder="Your password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoggingIn}
            className={`w-full font-bold py-2 px-4 rounded-lg transition duration-300 font-poppins text-sm ${
              isLoggingIn
                ? 'bg-gray-400 cursor-not-allowed text-gray-500'
                : 'bg-VerdeMenta hover:bg-AzulEletrico text-white hover:shadow-md'
            }`}
          >
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 text-xs text-gray-500 font-spaceGrotesk">
          <p>Note: You need to be added as an admin in Firestore.</p>
          <p>Contact the system administrator to get access.</p>
        </div>
      </div>
    </div>
  );
}; 