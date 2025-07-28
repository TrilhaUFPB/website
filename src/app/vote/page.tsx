'use client';

import { usePolls } from '@/hooks/trilhurna/usePolls';
import { PollVoting } from '@/components/trilhurna/PollVoting';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VotePage() {
  const { polls, loading, error } = usePolls();
  const searchParams = useSearchParams();
  const pollId = searchParams.get('id');

  // If a poll ID is provided, show the individual poll
  if (pollId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <PollVoting pollId={pollId} />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🗳️ Voting Polls
            </h1>
            <p className="text-xl text-gray-600">
              Choose a poll to vote in or create your own!
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {polls.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No polls available yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Be the first to create a poll!
                </p>
                <Link
                  href="/admin"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                >
                  Create Poll
                </Link>
              </div>
            ) : (
              polls.map((poll) => (
                <div
                  key={poll.id}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {poll.title}
                  </h3>
                  {poll.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {poll.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">
                      {poll.totalVotes} votes
                    </div>
                    <div className="text-sm text-gray-500">
                      {poll.options.length} options
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Options:
                    </div>
                    <div className="space-y-1">
                      {poll.options.slice(0, 3).map((option) => (
                        <div key={option.id} className="text-sm text-gray-600">
                          • {option.name}
                        </div>
                      ))}
                      {poll.options.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{poll.options.length - 3} more...
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/vote?id=${poll.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                  >
                    Vote Now
                  </Link>
                </div>
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/admin"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition duration-200 font-medium text-lg"
            >
              🎛️ Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 