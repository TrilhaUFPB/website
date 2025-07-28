'use client';

import { usePollVoting } from '@/hooks/trilhurna/usePollVoting';
import { useState } from 'react';

interface PollVotingProps {
  pollId: string;
}

export const PollVoting = ({ pollId }: PollVotingProps) => {
  const { poll, loading, hasVoted, error, vote, resetVote, calculatePercentage } = usePollVoting(pollId);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (optionId: string) => {
    setIsVoting(true);
    await vote(optionId);
    setIsVoting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            ❌ Poll Not Found
          </h2>
          <p className="text-gray-600">
            {error || 'This poll does not exist or has been deleted.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {poll.title}
        </h1>
        {poll.description && (
          <p className="text-gray-600 mb-4">
            {poll.description}
          </p>
        )}
        <div className="text-sm text-gray-500">
          Total votes: {poll.totalVotes}
        </div>
      </div>

      <div className="space-y-4">
        {poll.options.map((option) => {
          const percentage = calculatePercentage(option.votes);
          const isWinning = option.votes === Math.max(...poll.options.map(opt => opt.votes)) && option.votes > 0;
          
          return (
            <div
              key={option.id}
              className={`relative p-6 rounded-lg border-2 transition-all duration-300 ${
                isWinning 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {option.name}
                  {isWinning && (
                    <span className="ml-2 text-green-600 text-sm">🏆</span>
                  )}
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {option.votes}
                  </div>
                  <div className="text-sm text-gray-500">
                    {percentage}%
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    isWinning ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Vote button */}
              {!hasVoted && (
                <button
                  onClick={() => handleVote(option.id)}
                  disabled={isVoting}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    isVoting
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  {isVoting ? 'Voting...' : `Vote for ${option.name}`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {hasVoted && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-center">
            <p className="text-blue-800 font-medium mb-3">
              ✅ You have voted! Thanks for participating.
            </p>
            <button
              onClick={resetVote}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Reset my vote (for testing)
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Results update in real-time across all devices</p>
        <p className="mt-1">Poll ID: {pollId}</p>
      </div>
    </div>
  );
}; 