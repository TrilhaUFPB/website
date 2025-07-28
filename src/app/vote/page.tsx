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
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-AzulMeiaNoite mb-6 font-poppins">
              🗳️ Voting Polls
            </h1>
            <p className="text-xl text-gray-600 font-spaceGrotesk">
              Choose a poll to vote in or create your own!
            </p>
          </div>

          {error && (
            <div className="mb-8 p-6 bg-red-100 border border-red-400 text-red-700 rounded-2xl">
              {error}
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {polls.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-600 mb-4 font-poppins">
                  No polls available yet
                </h3>
                <p className="text-gray-500 mb-6 font-spaceGrotesk">
                  Be the first to create a poll!
                </p>
                <Link
                  href="/admin"
                  className="inline-block bg-VerdeMenta text-white px-8 py-4 rounded-xl hover:bg-AzulEletrico transition duration-300 font-bold font-poppins"
                >
                  Create Poll
                </Link>
              </div>
            ) : (
              polls.map((poll) => (
                <div
                  key={poll.id}
                  className="bg-Branco p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <h3 className="text-2xl font-semibold text-AzulMeiaNoite mb-4 font-poppins">
                    {poll.title}
                  </h3>
                  {poll.description && (
                    <p className="text-gray-600 mb-6 line-clamp-2 font-spaceGrotesk">
                      {poll.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-VerdeMenta font-medium bg-VerdeMenta/10 px-3 py-1 rounded-full">
                      🗳️ {poll.totalVotes} votes
                    </div>
                    <div className="text-sm text-AzulEletrico font-medium bg-AzulEletrico/10 px-3 py-1 rounded-full">
                      {poll.options.length} options
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-3 font-poppins">
                      Options:
                    </div>
                    <div className="space-y-2">
                      {poll.options.slice(0, 3).map((option) => (
                        <div key={option.id} className="text-sm text-gray-600 font-spaceGrotesk">
                          • {option.name}
                        </div>
                      ))}
                      {poll.options.length > 3 && (
                        <div className="text-sm text-gray-500 font-spaceGrotesk">
                          +{poll.options.length - 3} more...
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/vote?id=${poll.id}`}
                    className="block w-full bg-VerdeMenta text-white text-center py-4 px-6 rounded-xl hover:bg-AzulEletrico transition duration-300 font-bold font-poppins"
                  >
                    🗳️ Vote Now
                  </Link>
                </div>
              ))
            )}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/admin"
              className="inline-block bg-AzulMeiaNoite text-white px-10 py-5 rounded-2xl hover:bg-AzulEletrico transition duration-300 font-bold text-xl font-poppins"
            >
              🎛️ Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 