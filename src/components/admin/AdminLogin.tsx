import { useState } from 'react';
import { LogIn, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { COMPANY } from '@/lib/constants';

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
      return;
    }

    onLogin();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-4">
      <div className="w-full max-w-md">
        <a
          href="#/"
          className="mb-6 flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Retour au site
        </a>

        <div className="mb-8 text-center">
          <img
            src={COMPANY.logoUrl}
            alt={`Logo ${COMPANY.name}`}
            className="mx-auto h-16 w-16 rounded-full bg-white object-contain p-1"
          />
          <h1 className="mt-4 text-2xl font-bold text-white">
            Backoffice {COMPANY.name}
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Connectez-vous pour gérer les réservations
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-neutral-700 bg-neutral-800/50 p-6"
        >
          {error && (
            <div className="mb-4 rounded-lg bg-red-900/30 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-neutral-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-600 bg-neutral-800 px-4 py-2.5 text-white placeholder-neutral-500 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              placeholder="admin@afbtaxis.fr"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-sm font-medium text-neutral-300">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-600 bg-neutral-800 px-4 py-2.5 text-white placeholder-neutral-500 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-bold text-neutral-900 transition-all hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Connexion...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Se connecter
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
