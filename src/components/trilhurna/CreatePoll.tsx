'use client';

import { useState } from 'react';
import { usePolls, CreatePollData } from '@/hooks/trilhurna/usePolls';
import { useRouter } from 'next/navigation';

export const CreatePoll = () => {
  const { createPoll, loading, error } = usePolls();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']); // Start with 2 empty options
  const [allowMultipleVotes, setAllowMultipleVotes] = useState(false);
  const [maxVotes, setMaxVotes] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a poll title');
      return;
    }

    const validOptions = options.filter(option => option.trim() !== '');
    if (validOptions.length < 2) {
      alert('Please enter at least 2 options');
      return;
    }

    setIsCreating(true);
    try {
      const pollData: CreatePollData = {
        title: title.trim(),
        description: description.trim() || undefined,
        options: validOptions,
        allowMultipleVotes,
        maxVotes: allowMultipleVotes ? maxVotes : 1
      };

      const pollId = await createPoll(pollData);
      
      // Show success message with the poll link
      const pollUrl = `${window.location.origin}/vote?id=${pollId}`;
      alert(`Poll created successfully!\n\nShare this link:\n${pollUrl}`);
      
      // Reset form
      setTitle('');
      setDescription('');
      setOptions(['', '']);
      
      // Optionally redirect to the new poll
      router.push(`/vote?id=${pollId}`);
      
    } catch (error) {
      console.error('Error creating poll:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-Branco rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-AzulMeiaNoite mb-4 text-center font-poppins">
        Create New Poll
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poll Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Cats vs Dogs"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your poll..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options *
          </label>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Option ${index + 1}`}
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addOption}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
          >
            + Add Option
          </button>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="allowMultipleVotes"
              checked={allowMultipleVotes}
              onChange={(e) => setAllowMultipleVotes(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="allowMultipleVotes" className="text-sm font-medium text-gray-700">
              Allow multiple choice voting
            </label>
          </div>
          
          {allowMultipleVotes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum votes per user
              </label>
              <input
                type="number"
                min="1"
                max={options.filter(opt => opt.trim() !== '').length}
                value={maxVotes}
                onChange={(e) => setMaxVotes(Math.min(parseInt(e.target.value) || 1, options.filter(opt => opt.trim() !== '').length))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isCreating || loading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
            isCreating || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
          }`}
        >
          {isCreating ? 'Creating Poll...' : 'Create Poll'}
        </button>
      </form>
    </div>
  );
}; 