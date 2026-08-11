'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } finally {
      setLoggingOut(false);
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
            textAlign: 'center',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <Image src="/assets/logo.svg" alt="Trilha" width={48} height={34} style={{ filter: 'brightness(0)' }} />
            </div>
            <h1 className="display font-poppins" style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              color: 'var(--ink)',
              marginBottom: '0.5rem',
            }}>
              Admin
            </h1>
            <p className="font-spaceGrotesk" style={{
              color: 'var(--ink-soft)',
              fontSize: 14,
              marginBottom: '2rem',
            }}>
              Em breve algo aqui.
            </p>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="font-spaceGrotesk"
              style={{ fontSize: 13, color: 'var(--ink-soft)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {loggingOut ? 'Saindo…' : 'Sair →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
