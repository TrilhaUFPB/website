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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-VerdeMenta"></div>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-Branco rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-4 font-poppins">
            ❌ Poll Not Found
          </h2>
          <p className="text-gray-600 font-spaceGrotesk">
            {error || 'This poll does not exist or has been deleted.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-Branco rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-AzulMeiaNoite mb-4 font-poppins">
          {poll.title}
        </h1>
        {poll.description && (
          <p className="text-lg text-gray-600 mb-6 font-spaceGrotesk">
            {poll.description}
          </p>
        )}
        <div className="inline-block bg-VerdeMenta/10 text-VerdeMenta px-4 py-2 rounded-full text-sm font-medium">
          🗳️ {poll.totalVotes} total votes
        </div>
      </div>

      <div className="space-y-6">
        {poll.options.map((option) => {
          const percentage = calculatePercentage(option.votes);
          const isWinning = option.votes === Math.max(...poll.options.map(opt => opt.votes)) && option.votes > 0;
          
          return (
            <div
              key={option.id}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-500 transform hover:scale-[1.02] ${
                isWinning 
                  ? 'border-VerdeMenta bg-VerdeMenta/5 shadow-lg' 
                  : 'border-gray-200 hover:border-AzulEletrico/30 bg-white hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-AzulMeiaNoite font-poppins">
                  {option.name}
                  {isWinning && (
                    <span className="ml-3 text-VerdeMenta text-2xl">🏆</span>
                  )}
                </h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-AzulMeiaNoite font-poppins">
                    {option.votes}
                  </div>
                  <div className="text-sm text-gray-500 font-spaceGrotesk">
                    {percentage}%
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
                <div
                  className={`h-4 rounded-full transition-all duration-700 ease-out ${
                    isWinning ? 'bg-VerdeMenta' : 'bg-AzulEletrico'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Vote button */}
              {!hasVoted && (
                <button
                  onClick={() => handleVote(option.id)}
                  disabled={isVoting}
                  className={`w-full py-4 px-8 rounded-xl font-bold transition-all duration-300 text-lg ${
                    isVoting
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-VerdeMenta hover:bg-AzulEletrico text-white hover:shadow-xl transform hover:scale-105 font-poppins'
                  }`}
                >
                  {isVoting ? 'Voting...' : `🗳️ Vote for ${option.name}`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {hasVoted && (
        <div className="mt-10 p-6 bg-VerdeMenta/10 rounded-2xl border border-VerdeMenta/20">
          <div className="text-center">
            <p className="text-VerdeMenta font-bold mb-4 text-lg font-poppins">
              ✅ You have voted! Thanks for participating.
            </p>
            <button
              onClick={resetVote}
              className="text-sm text-AzulEletrico hover:text-AzulMeiaNoite underline font-spaceGrotesk"
            >
              Reset my vote (for testing)
            </button>
          </div>
        </div>
      )}

      <div className="mt-10 text-center text-sm text-gray-500 font-spaceGrotesk">
        <p>Results update in real-time across all devices</p>
        <p className="mt-2 text-xs">Poll ID: {pollId}</p>
      </div>
    </div>
  );
}; 