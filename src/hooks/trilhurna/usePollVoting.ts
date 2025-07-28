import { useState, useEffect } from 'react';
import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot
} from 'firebase/firestore';
import { db } from '@/lib/trilhurna/firebase';
import { Poll } from './usePolls';

const VOTED_KEY_PREFIX = 'poll-voted-';

export const usePollVoting = (pollId: string) => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const votedKey = `${VOTED_KEY_PREFIX}${pollId}`;

  // Check if user has already voted for this poll
  useEffect(() => {
    const voted = localStorage.getItem(votedKey);
    if (voted) {
      setHasVoted(true);
    }
  }, [pollId, votedKey]);

  // Listen for real-time poll updates
  useEffect(() => {
    if (!pollId) return;

    const pollRef = doc(db, 'polls', pollId);
    
    const unsubscribe = onSnapshot(pollRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const pollData: Poll = {
          id: doc.id,
          title: data.title,
          description: data.description,
          options: Array.isArray(data.options) ? data.options : [],
          totalVotes: data.totalVotes || 0,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          createdBy: data.createdBy || 'admin',
          isActive: data.isActive !== false
        };
        setPoll(pollData);
        setLoading(false);
      } else {
        setError('Poll not found');
        setLoading(false);
      }
    }, (error) => {
      console.error('Error listening to poll updates:', error);
      setError('Failed to load poll');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pollId]);

  const vote = async (optionId: string) => {
    if (hasVoted || !poll) {
      alert('You have already voted in this poll!');
      return;
    }

    try {
      const pollRef = doc(db, 'polls', pollId);
      
      // Get current data to update properly
      const docSnap = await getDoc(pollRef);
      if (!docSnap.exists()) {
        throw new Error('Poll not found');
      }
      
      const currentData = docSnap.data();
      const currentOptions = Array.isArray(currentData.options) ? currentData.options : [];
      
      // Find and update the specific option
      const updatedOptions = currentOptions.map(option => 
        option.id === optionId 
          ? { ...option, votes: option.votes + 1 }
          : option
      );
      
      // Update the poll
      await setDoc(pollRef, {
        options: updatedOptions,
        totalVotes: (currentData.totalVotes || 0) + 1,
        updatedAt: new Date()
      }, { merge: true });

      // Mark user as voted for this specific poll
      localStorage.setItem(votedKey, 'true');
      setHasVoted(true);

    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to submit vote. Please try again.');
    }
  };

  const resetVote = () => {
    localStorage.removeItem(votedKey);
    setHasVoted(false);
  };

  const calculatePercentage = (votes: number) => {
    if (!poll || poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  return {
    poll,
    loading,
    hasVoted,
    error,
    vote,
    resetVote,
    calculatePercentage
  };
}; 