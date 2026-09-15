'use client';

import { usePollVoting } from '@/hooks/trilhurna/usePollVoting';
import { useState } from 'react';

interface PollVotingProps {
  pollId: string;
}

export const PollVoting = ({ pollId }: PollVotingProps) => {
  const { 
    poll, 
    loading, 
    hasVoted, 
    selectedOptions,
    error, 
    toggleOption,
    submitVote,
    startChangingVote,
    calculatePercentage 
  } = usePollVoting(pollId);
  const [isVoting, setIsVoting] = useState(false);

  const handleSubmitVote = async () => {
    setIsVoting(true);
    await submitVote();
    setIsVoting(false);
  };

  const handleStartChangingVote = async () => {
    setIsVoting(true);
    await startChangingVote();
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
      <div className="max-w-2xl mx-auto p-8 bg-Branco rounded-lg shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4 font-poppins">
            Poll Not Found
          </h2>
          <p className="text-gray-600 font-spaceGrotesk text-sm">
            {error || 'This poll does not exist or has been deleted.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-Branco rounded-lg shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-AzulMeiaNoite mb-4 font-poppins">
          {poll.title}
        </h1>
        {poll.description && (
          <p className="text-base text-gray-600 mb-4 font-spaceGrotesk">
            {poll.description}
          </p>
        )}
        <div className="inline-block bg-VerdeMenta/10 text-VerdeMenta px-3 py-1 rounded-md text-xs font-medium">
          {poll.totalVotes} total votes
        </div>
      </div>

      {/* Poll type indicator */}
      {poll.allowMultipleVotes && (
        <div className="mb-4 text-center">
          <div className="inline-block bg-AzulEletrico/10 text-AzulEletrico px-3 py-1 rounded-md text-xs font-medium">
            Multiple choice poll - Select up to {poll.maxVotes || poll.options.length} options
          </div>
        </div>
      )}

      <div className="space-y-3">
        {poll.options.map((option) => {
          const percentage = calculatePercentage(option.votes);
          const isWinning = option.votes === Math.max(...poll.options.map(opt => opt.votes)) && option.votes > 0;
          const isSelected = selectedOptions.includes(option.id);
          
          return (
            <div
              key={option.id}
              className={`relative p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-VerdeMenta bg-VerdeMenta/10 shadow-md'
                  : isWinning 
                    ? 'border-VerdeMenta bg-VerdeMenta/5 shadow-sm' 
                    : 'border-gray-200 hover:border-AzulEletrico/30 bg-white'
              }`}
              onClick={() => !hasVoted && toggleOption(option.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {!hasVoted && (
                    <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                      isSelected 
                        ? 'border-VerdeMenta bg-VerdeMenta' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                      )}
                    </div>
                  )}
                  <h3 className="text-base font-semibold text-AzulMeiaNoite font-poppins">
                    {option.name}
                    {isWinning && (
                      <span className="ml-2 text-VerdeMenta text-sm">★</span>
                    )}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-AzulMeiaNoite font-poppins">
                    {option.votes}
                  </div>
                  <div className="text-xs text-gray-500 font-spaceGrotesk">
                    {percentage}%
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${
                    isWinning ? 'bg-VerdeMenta' : 'bg-AzulEletrico'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voting buttons */}
      {!hasVoted && selectedOptions.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmitVote}
            disabled={isVoting}
            className={`py-3 px-6 rounded-lg font-bold transition-all duration-300 text-base ${
              isVoting
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-VerdeMenta hover:bg-AzulEletrico text-white hover:shadow-md font-poppins'
            }`}
          >
            {isVoting ? 'Submitting...' : `Submit Vote${selectedOptions.length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}



      {hasVoted && (
        <div className="mt-6 p-4 bg-VerdeMenta/10 rounded-lg border border-VerdeMenta/20">
          <div className="text-center">
            <p className="text-VerdeMenta font-bold text-sm font-poppins mb-3">
              You have voted! Thanks for participating.
            </p>
            <button
              onClick={handleStartChangingVote}
              disabled={isVoting}
              className="text-xs text-AzulEletrico hover:text-AzulMeiaNoite underline font-spaceGrotesk"
            >
              {isVoting ? 'Starting...' : 'Change my vote'}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-xs text-gray-500 font-spaceGrotesk">
        <p className="mt-1 text-xs opacity-50">Poll ID: {pollId}</p>
      </div>
          </div>
    );
  }; 