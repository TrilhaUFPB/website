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
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const votedKey = `${VOTED_KEY_PREFIX}${pollId}`;

  // Check if user has already voted for this poll
  useEffect(() => {
    const voted = localStorage.getItem(votedKey);
    if (voted) {
      try {
        const votedData = JSON.parse(voted);
        setHasVoted(true);
        setSelectedOptions(votedData.selectedOptions || []);
      } catch {
        // Legacy format - just a boolean
        setHasVoted(true);
      }
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
          isActive: data.isActive !== false,
          allowMultipleVotes: data.allowMultipleVotes || false,
          maxVotes: data.maxVotes || 1
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

  const toggleOption = (optionId: string) => {
    if (!poll) return;
    
    if (poll.allowMultipleVotes) {
      setSelectedOptions(prev => {
        const isSelected = prev.includes(optionId);
        
        if (isSelected) {
          return prev.filter(id => id !== optionId);
        } else {
          if (prev.length >= (poll.maxVotes || 1)) {
            alert(`You can only select up to ${poll.maxVotes || 1} options.`);
            return prev;
          }
          return [...prev, optionId];
        }
      });
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const submitVote = async () => {
    if (!poll || selectedOptions.length === 0) {
      alert('Please select at least one option!');
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
      
      // Update all selected options
      const updatedOptions = currentOptions.map(option => 
        selectedOptions.includes(option.id)
          ? { ...option, votes: option.votes + 1 }
          : option
      );
      
      // Update the poll
      await setDoc(pollRef, {
        options: updatedOptions,
        totalVotes: (currentData.totalVotes || 0) + selectedOptions.length,
        updatedAt: new Date()
      }, { merge: true });

      // Mark user as voted for this specific poll
      localStorage.setItem(votedKey, JSON.stringify({
        selectedOptions,
        votedAt: new Date().toISOString()
      }));
      setHasVoted(true);

    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to submit vote. Please try again.');
    }
  };

  const changeVote = async () => {
    if (!poll) return;

    try {
      const pollRef = doc(db, 'polls', pollId);
      
      // Get current data
      const docSnap = await getDoc(pollRef);
      if (!docSnap.exists()) {
        throw new Error('Poll not found');
      }
      
      const currentData = docSnap.data();
      const currentOptions = Array.isArray(currentData.options) ? currentData.options : [];
      
      // Get previous vote data from localStorage
      const previousVote = localStorage.getItem(votedKey);
      let previousSelectedOptions: string[] = [];
      
      if (previousVote) {
        try {
          const votedData = JSON.parse(previousVote);
          previousSelectedOptions = votedData.selectedOptions || [];
        } catch {
          // Legacy format - assume single vote
          previousSelectedOptions = [selectedOptions[0]];
        }
      }
      
      // Remove previous votes first
      let updatedOptions = currentOptions.map(option => {
        const wasVoted = previousSelectedOptions.includes(option.id);
        const newVoteCount = wasVoted ? Math.max(0, option.votes - 1) : option.votes;
        return { ...option, votes: newVoteCount };
      });
      
      // Then add new votes
      updatedOptions = updatedOptions.map(option => {
        const isVoted = selectedOptions.includes(option.id);
        const newVoteCount = isVoted ? option.votes + 1 : option.votes;
        return { ...option, votes: newVoteCount };
      });
      
      // Calculate the correct total vote difference
      const voteDifference = selectedOptions.length - previousSelectedOptions.length;
      const newTotalVotes = Math.max(0, (currentData.totalVotes || 0) + voteDifference);
      
      // Update the poll
      await setDoc(pollRef, {
        options: updatedOptions,
        totalVotes: newTotalVotes,
        updatedAt: new Date()
      }, { merge: true });

      // Update localStorage
      localStorage.setItem(votedKey, JSON.stringify({
        selectedOptions,
        votedAt: new Date().toISOString()
      }));
      setHasVoted(true);

    } catch (error) {
      console.error('Error changing vote:', error);
      alert('Failed to change vote. Please try again.');
    }
  };

  const startChangingVote = async () => {
    if (!poll) return;

    try {
      // Get current vote from localStorage
      const previousVote = localStorage.getItem(votedKey);
      let currentVote: string[] = [];
      
      if (previousVote) {
        try {
          const votedData = JSON.parse(previousVote);
          currentVote = votedData.selectedOptions || [];
        } catch {
          // Legacy format - assume single vote
          currentVote = [selectedOptions[0]];
        }
      }

      // Remove the vote from Firebase
      const pollRef = doc(db, 'polls', pollId);
      const docSnap = await getDoc(pollRef);
      
      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const currentOptions = Array.isArray(currentData.options) ? currentData.options : [];
        
        // Remove votes from all previously voted options
        const updatedOptions = currentOptions.map(option => 
          currentVote.includes(option.id)
            ? { ...option, votes: Math.max(0, option.votes - 1) }
            : option
        );
        
        // Update the poll
        await setDoc(pollRef, {
          options: updatedOptions,
          totalVotes: Math.max(0, (currentData.totalVotes || 0) - currentVote.length),
          updatedAt: new Date()
        }, { merge: true });
      }

      // Clear localStorage and reset state to initial voting state
      localStorage.removeItem(votedKey);
      setHasVoted(false);
      setSelectedOptions([]);

    } catch (error) {
      console.error('Error starting vote change:', error);
      alert('Failed to start vote change. Please try again.');
    }
  };

  const resetVote = () => {
    localStorage.removeItem(votedKey);
    setHasVoted(false);
    setSelectedOptions([]);
  };

  const calculatePercentage = (votes: number) => {
    if (!poll || poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  return {
    poll,
    loading,
    hasVoted,
    selectedOptions,
    error,
    toggleOption,
    submitVote,
    startChangingVote,
    resetVote,
    calculatePercentage
  };
}; 