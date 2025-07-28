import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/trilhurna/firebase';

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin by looking up their email in Firestore
  const checkAdminStatus = async (userEmail: string) => {
    try {
      const adminDoc = doc(db, 'admins', 'admin-list');
      const adminSnap = await getDoc(adminDoc);
      
      if (adminSnap.exists()) {
        const adminData = adminSnap.data();
        const adminEmails = adminData.emails || [];
        setIsAdmin(adminEmails.includes(userEmail));
      } else {
        // If no admin list exists, create it with your email
        console.log('No admin list found. Please create one in Firestore.');
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        await checkAdminStatus(user.email || '');
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAdmin
  };
}; 