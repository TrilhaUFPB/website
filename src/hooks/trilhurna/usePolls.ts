import { useState, useEffect } from 'react';
import { 
  doc, 
  getDoc, 
  onSnapshot, 
  collection,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '@/lib/trilhurna/firebase';

export interface PollOption {
  id: string;
  name: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  totalVotes: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isActive: boolean;
  allowMultipleVotes?: boolean;
  maxVotes?: number; // Maximum number of options a user can vote for
}

export interface CreatePollData {
  title: string;
  description?: string;
  options: string[]; // Array of option names
  allowMultipleVotes?: boolean;
  maxVotes?: number;
}

export const usePolls = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen for all polls
  useEffect(() => {
    const pollsRef = collection(db, 'polls');
    const q = query(pollsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pollsData: Poll[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        pollsData.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          options: data.options || [],
          totalVotes: data.totalVotes || 0,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          createdBy: data.createdBy || 'admin',
          isActive: data.isActive !== false,
          allowMultipleVotes: data.allowMultipleVotes || false,
          maxVotes: data.maxVotes || 1
        });
      });
      setPolls(pollsData);
      setLoading(false);
    }, (error) => {
      console.error('Error listening to polls:', error);
      setError('Failed to load polls');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createPoll = async (pollData: CreatePollData) => {
    try {
      setError(null);
      
      const options = pollData.options.map((name, index) => ({
        id: `option-${index}`,
        name,
        votes: 0
      }));

      const newPoll = {
        title: pollData.title,
        description: pollData.description,
        options,
        totalVotes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'admin',
        isActive: true,
        allowMultipleVotes: pollData.allowMultipleVotes || false,
        maxVotes: pollData.maxVotes || 1
      };

      const docRef = await addDoc(collection(db, 'polls'), newPoll);
      return docRef.id;
    } catch (error) {
      console.error('Error creating poll:', error);
      setError('Failed to create poll');
      throw error;
    }
  };

  const updatePoll = async (pollId: string, updates: Partial<Poll>) => {
    try {
      setError(null);
      const pollRef = doc(db, 'polls', pollId);
      await updateDoc(pollRef, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating poll:', error);
      setError('Failed to update poll');
      throw error;
    }
  };

  const deletePoll = async (pollId: string) => {
    try {
      setError(null);
      const pollRef = doc(db, 'polls', pollId);
      await deleteDoc(pollRef);
    } catch (error) {
      console.error('Error deleting poll:', error);
      setError('Failed to delete poll');
      throw error;
    }
  };

  const getPoll = async (pollId: string): Promise<Poll | null> => {
    try {
      const pollRef = doc(db, 'polls', pollId);
      const pollSnap = await getDoc(pollRef);
      
      if (pollSnap.exists()) {
        const data = pollSnap.data();
        return {
          id: pollSnap.id,
          title: data.title,
          description: data.description,
          options: data.options || [],
          totalVotes: data.totalVotes || 0,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          createdBy: data.createdBy || 'admin',
          isActive: data.isActive !== false,
          allowMultipleVotes: data.allowMultipleVotes || false,
          maxVotes: data.maxVotes || 1
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting poll:', error);
      return null;
    }
  };

  return {
    polls,
    loading,
    error,
    createPoll,
    updatePoll,
    deletePoll,
    getPoll
  };
}; 