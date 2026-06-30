'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error ?? 'Erro ao fazer login.');
      }
    } catch {
      setError('Erro ao conectar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          <div style={{
            background: 'var(--cream)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 16,
            padding: '2rem',
          }}>
            <h1 className="display font-poppins" style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              color: 'var(--ink)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}>
              Admin
            </h1>
            <p className="font-spaceGrotesk" style={{
              color: 'var(--ink-soft)',
              textAlign: 'center',
              marginBottom: '1.5rem',
              fontSize: 14,
            }}>
              TrilhaUFPB
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="font-poppins" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                  Usuário
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="aulas-input"
                  placeholder="usuário"
                  autoComplete="username"
                  required
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="font-poppins" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                  Senha
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="aulas-input"
                  placeholder="senha"
                  autoComplete="current-password"
                  required
                />
              </label>
              {error && <p className="aulas-form-error">{error}</p>}
              <button type="submit" className="btn btn--mint" disabled={loading}>
                {loading ? 'Entrando…' : <>Entrar <span className="arrow">→</span></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
