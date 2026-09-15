'use client';

import { usePolls } from '@/hooks/trilhurna/usePolls';
import { PollVoting } from '@/components/trilhurna/PollVoting';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function TrilhurnaPageContent() {
  const { polls, loading, error } = usePolls();
  const searchParams = useSearchParams();
  const pollId = searchParams.get('id');

  // If a poll ID is provided, show the individual poll
  if (pollId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-AzulCeu/20 to-Branco py-12">
        <div className="container mx-auto px-4">
          <PollVoting pollId={pollId} />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-AzulCeu/20 to-Branco py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-VerdeMenta"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-AzulCeu/20 to-Branco py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-AzulMeiaNoite mb-4 font-poppins">
              Trilhurna Voting
            </h1>
            <p className="text-base text-gray-600 font-spaceGrotesk">
              Choose a poll to vote in or create your own!
            </p>
          </div>

          {error && (
            <div className="mb-8 p-6 bg-red-100 border border-red-400 text-red-700 rounded-2xl">
              {error}
            </div>
          )}

          <div className="space-y-3">
            {polls.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-600 mb-3 font-poppins">
                  No polls available yet
                </h3>
                <p className="text-gray-500 mb-4 font-spaceGrotesk text-sm">
                  Be the first to create a poll!
                </p>
                <Link
                  href="/admin"
                  className="inline-block bg-VerdeMenta text-white px-6 py-2 rounded-lg hover:bg-AzulEletrico transition duration-300 font-bold font-poppins text-sm"
                >
                  Create Poll
                </Link>
              </div>
            ) : (
              polls.map((poll) => (
                <div
                  key={poll.id}
                  className="bg-Branco p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-AzulMeiaNoite mb-1 font-poppins">
                      {poll.title}
                    </h3>
                    {poll.description && (
                      <p className="text-gray-600 text-sm line-clamp-1 font-spaceGrotesk">
                        {poll.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-VerdeMenta font-medium">
                        {poll.totalVotes} votes
                      </span>
                      <span className="text-xs text-AzulEletrico font-medium">
                        {poll.options.length} options
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/trilhurna?id=${poll.id}`}
                    className="bg-VerdeMenta text-white px-4 py-2 rounded-lg hover:bg-AzulEletrico transition duration-300 font-bold font-poppins text-sm"
                  >
                    Vote Now
                  </Link>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 text-right">
            <Link
              href="/admin"
              className="inline-block text-gray-400 hover:text-AzulEletrico transition duration-300 text-xs font-spaceGrotesk"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrilhurnaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-AzulCeu/20 to-Branco py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-VerdeMenta"></div>
          </div>
        </div>
      </div>
    }>
      <TrilhurnaPageContent />
    </Suspense>
  );
}