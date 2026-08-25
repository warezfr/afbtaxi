import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { I18nProvider } from '@/lib/i18n';
import { PublicPage } from '@/components/PublicPage';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

type Route = 'public' | 'admin';

function getRouteFromHash(): Route {
  return window.location.hash.startsWith('#/admin') ? 'admin' : 'public';
}

function App() {
  const [route, setRoute] = useState<Route>(getRouteFromHash());
  const [session, setSession] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
      setCheckingAuth(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s);
    });

    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);

    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  if (route === 'admin') {
    if (checkingAuth) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-900">
          <div className="text-neutral-400">Chargement...</div>
        </div>
      );
    }
    if (!session) return <AdminLogin onLogin={() => setSession(true)} />;
    return <AdminDashboard onLogout={() => setSession(false)} />;
  }

  return (
    <I18nProvider>
      <PublicPage />
    </I18nProvider>
  );
}

export default App;
