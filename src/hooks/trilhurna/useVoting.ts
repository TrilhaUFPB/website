import { useState, useEffect } from 'react';
import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot
} from 'firebase/firestore';
import { db } from '@/lib/trilhurna/firebase';

export interface VoteOption {
  id: string;
  name: string;
  votes: number;
}

export interface VotingData {
  options: VoteOption[];
  totalVotes: number;
}

const VOTING_DOC_ID = 'voting-poll';
const VOTED_KEY = 'has-voted';

export const useVoting = () => {
  const [votingData, setVotingData] = useState<VotingData>({
    options: [
      { id: 'cats', name: 'Cats', votes: 0 },
      { id: 'dogs', name: 'Dogs', votes: 0 }
    ],
    totalVotes: 0
  });
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);

  // Check if user has already voted
  useEffect(() => {
    const voted = localStorage.getItem(VOTED_KEY);
    if (voted) {
      setHasVoted(true);
    }
  }, []);

  // Initialize or get voting data
  useEffect(() => {
    const votingRef = doc(db, 'voting', VOTING_DOC_ID);

    const initializeVoting = async () => {
      try {
        const docSnap = await getDoc(votingRef);
        
        if (!docSnap.exists()) {
          // Initialize with default data
          const initialData = {
            options: [
              { id: 'cats', name: 'Cats', votes: 0 },
              { id: 'dogs', name: 'Dogs', votes: 0 }
            ],
            totalVotes: 0,
            createdAt: new Date()
          };
          await setDoc(votingRef, initialData);
        }
      } catch (error) {
        console.error('Error initializing voting:', error);
      }
    };

    initializeVoting();
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    const votingRef = doc(db, 'voting', VOTING_DOC_ID);
    
    const unsubscribe = onSnapshot(votingRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // Ensure options is always an array and has the correct structure
        const options = Array.isArray(data.options) ? data.options : [
          { id: 'cats', name: 'Cats', votes: 0 },
          { id: 'dogs', name: 'Dogs', votes: 0 }
        ];
        
        setVotingData({
          options: options,
          totalVotes: data.totalVotes || 0
        });
        setLoading(false);
      }
    }, (error) => {
      console.error('Error listening to voting updates:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const vote = async (optionId: string) => {
    if (hasVoted) {
      alert('You have already voted!');
      return;
    }

    try {
      const votingRef = doc(db, 'voting', VOTING_DOC_ID);
      
      // Get current data to update properly
      const docSnap = await getDoc(votingRef);
      if (!docSnap.exists()) {
        throw new Error('Voting document not found');
      }
      
      const currentData = docSnap.data();
      const currentOptions = Array.isArray(currentData.options) ? currentData.options : [
        { id: 'cats', name: 'Cats', votes: 0 },
        { id: 'dogs', name: 'Dogs', votes: 0 }
      ];
      
      // Find and update the specific option
      const updatedOptions = currentOptions.map(option => 
        option.id === optionId 
          ? { ...option, votes: option.votes + 1 }
          : option
      );
      
      // Update the entire document
      await setDoc(votingRef, {
        options: updatedOptions,
        totalVotes: (currentData.totalVotes || 0) + 1,
        updatedAt: new Date()
      }, { merge: true });

      // Mark user as voted
      localStorage.setItem(VOTED_KEY, 'true');
      setHasVoted(true);

    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to submit vote. Please try again.');
    }
  };

  const resetVotes = () => {
    localStorage.removeItem(VOTED_KEY);
    setHasVoted(false);
  };

  return {
    votingData,
    loading,
    hasVoted,
    vote,
    resetVotes
  };
}; 