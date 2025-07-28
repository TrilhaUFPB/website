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
      <div className="max-w-md mx-auto p-8 bg-Branco rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-AzulMeiaNoite mb-4 font-poppins">
            🎉 Admin Logged In
          </h2>
          <p className="text-gray-600 mb-8 font-spaceGrotesk">
            You can now create and manage polls.
          </p>
          <button
            onClick={logout}
            className="bg-red-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-red-600 transition duration-300 font-poppins"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-Branco rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-AzulMeiaNoite mb-4 font-poppins">
          🔐 Admin Login
        </h2>
        <p className="text-gray-600 mb-8 font-spaceGrotesk">
          Login with your Firebase account to access admin features.
        </p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-VerdeMenta focus:border-VerdeMenta transition duration-200"
              placeholder="your-email@domain.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-VerdeMenta focus:border-VerdeMenta transition duration-200"
              placeholder="Your password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoggingIn}
            className={`w-full font-bold py-4 px-6 rounded-xl transition duration-300 font-poppins ${
              isLoggingIn
                ? 'bg-gray-400 cursor-not-allowed text-gray-500'
                : 'bg-VerdeMenta hover:bg-AzulEletrico text-white hover:shadow-lg'
            }`}
          >
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 text-sm text-gray-500 font-spaceGrotesk">
          <p>Note: You need to be added as an admin in Firestore.</p>
          <p>Contact the system administrator to get access.</p>
        </div>
      </div>
    </div>
  );
}; 