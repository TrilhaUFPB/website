'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePolls } from '@/hooks/trilhurna/usePolls';
import { CreatePoll } from './CreatePoll';

export const AdminDashboard = () => {
  const { polls, loading, error, deletePoll } = usePolls();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deletingPoll, setDeletingPoll] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } finally {
      setLoggingOut(false);
    }
  };

  const handleDeletePoll = async (pollId: string) => {
    if (confirm('Tem certeza que deseja deletar esta enquete? Esta ação não pode ser desfeita.')) {
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
    const pollUrl = `${window.location.origin}/trilhurna?id=${pollId}`;
    navigator.clipboard.writeText(pollUrl);
    alert('Link da enquete copiado!');
  };

  if (showCreateForm) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
          >
            ← Voltar
          </button>
        </div>
        <CreatePoll />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-AzulMeiaNoite font-poppins">
          Admin Dashboard
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-VerdeMenta text-white px-4 py-2 rounded-lg hover:bg-AzulEletrico transition duration-300 font-bold font-poppins text-sm"
          >
            + Nova enquete
          </button>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-sm text-gray-400 hover:text-red-500 transition duration-300 font-spaceGrotesk"
          >
            {loggingOut ? 'Saindo…' : 'Sair'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-VerdeMenta"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {polls.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold text-gray-600 mb-2 font-poppins">
                Nenhuma enquete criada
              </h3>
              <p className="text-gray-500 text-sm font-spaceGrotesk">
                Crie a primeira enquete para começar!
              </p>
            </div>
          ) : (
            polls.map((poll) => (
              <div
                key={poll.id}
                className="bg-Branco p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-AzulMeiaNoite mb-1 font-poppins">
                      {poll.title}
                    </h3>
                    {poll.description && (
                      <p className="text-gray-600 mb-2 text-sm font-spaceGrotesk">
                        {poll.description}
                      </p>
                    )}
                    <div className="text-xs text-gray-500 font-spaceGrotesk">
                      Criado em: {poll.createdAt.toLocaleDateString('pt-BR')}
                      <span className="mx-2">•</span>
                      Total de votos: {poll.totalVotes}
                      <span className="mx-2">•</span>
                      Opções: {poll.options.length}
                      {poll.allowMultipleVotes && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-AzulEletrico">Múltipla escolha (max {poll.maxVotes})</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => copyPollLink(poll.id)}
                      className="bg-AzulEletrico text-white px-2 py-1 rounded text-xs hover:bg-AzulMeiaNoite transition duration-200 font-bold"
                      title="Copiar link"
                    >
                      Copiar
                    </button>
                    <a
                      href={`/trilhurna?id=${poll.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-VerdeMenta text-white px-2 py-1 rounded text-xs hover:bg-AzulEletrico transition duration-200 font-bold"
                      title="Ver enquete"
                    >
                      Ver
                    </a>
                    <button
                      onClick={() => handleDeletePoll(poll.id)}
                      disabled={deletingPoll === poll.id}
                      className={`px-2 py-1 rounded text-xs transition duration-200 font-bold ${
                        deletingPoll === poll.id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                      title="Deletar"
                    >
                      {deletingPoll === poll.id ? '…' : '×'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {poll.options.map((option) => (
                    <div
                      key={option.id}
                      className="bg-gray-50 p-2 rounded text-center"
                    >
                      <div className="font-medium text-gray-900 text-sm font-poppins">
                        {option.name}
                      </div>
                      <div className="text-xs text-gray-600 font-spaceGrotesk">
                        {option.votes} votos
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