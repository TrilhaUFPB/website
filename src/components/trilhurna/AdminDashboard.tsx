'use client';

import { useState } from 'react';
import { usePolls } from '@/hooks/trilhurna/usePolls';
import { useAdminAuth } from '@/hooks/trilhurna/useAdminAuth';
import { CreatePoll } from './CreatePoll';

export const AdminDashboard = () => {
  const { polls, loading, error, deletePoll } = usePolls();
  const { isAdmin } = useAdminAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deletingPoll, setDeletingPoll] = useState<string | null>(null);

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            🔒 Access Denied
          </h2>
          <p className="text-gray-600">
            You need to be logged in as admin to access this page.
          </p>
        </div>
      </div>
    );
  }

  const handleDeletePoll = async (pollId: string) => {
    if (confirm('Are you sure you want to delete this poll? This action cannot be undone.')) {
      setDeletingPoll(pollId);
      try {
        await deletePoll(pollId);
      } catch (error) {
        console.error('Error deleting poll:', error);
      } finally {
        setDeletingPoll(null);
      }
    }
  };

  const copyPollLink = (pollId: string) => {
    const pollUrl = `${window.location.origin}/vote?id=${pollId}`;
    navigator.clipboard.writeText(pollUrl);
    alert('Poll link copied to clipboard!');
  };

  if (showCreateForm) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
          >
            ← Back to Dashboard
          </button>
        </div>
        <CreatePoll />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          🎛️ Admin Dashboard
        </h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200 font-medium"
        >
          + Create New Poll
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {polls.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No polls created yet
              </h3>
              <p className="text-gray-500">
                Create your first poll to get started!
              </p>
            </div>
          ) : (
            polls.map((poll) => (
              <div
                key={poll.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {poll.title}
                    </h3>
                    {poll.description && (
                      <p className="text-gray-600 mb-2">
                        {poll.description}
                      </p>
                    )}
                    <div className="text-sm text-gray-500">
                      Created: {poll.createdAt.toLocaleDateString()}
                      <span className="mx-2">•</span>
                      Total votes: {poll.totalVotes}
                      <span className="mx-2">•</span>
                      Options: {poll.options.length}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => copyPollLink(poll.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-200"
                    >
                      Copy Link
                    </button>
                    <a
                      href={`/vote?id=${poll.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition duration-200"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDeletePoll(poll.id)}
                      disabled={deletingPoll === poll.id}
                      className={`px-3 py-1 rounded text-sm transition duration-200 ${
                        deletingPoll === poll.id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {deletingPoll === poll.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {poll.options.map((option) => (
                    <div
                      key={option.id}
                      className="bg-gray-50 p-3 rounded text-center"
                    >
                      <div className="font-medium text-gray-900">
                        {option.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {option.votes} votes
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}; 