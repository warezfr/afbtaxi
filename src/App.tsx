import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ThemeProvider } from '@/lib/ThemeContext';
import { I18nProvider } from '@/lib/i18n';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Home } from '@/pages/Home';
import { SeoLandingPage } from '@/pages/SeoLandingPage';
import { BlogList } from '@/pages/BlogList';
import { BlogPost } from '@/pages/BlogPost';

import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

function App() {
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

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // For Admin section, we keep a separate isolated tree without the public layout
  const AdminRoute = () => {
    if (checkingAuth) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-900">
          <div className="text-neutral-400">Chargement...</div>
        </div>
      );
    }
    if (!session) return <AdminLogin onLogin={() => setSession(true)} />;
    return <AdminDashboard onLogout={() => setSession(false)} />;
  };

  return (
    <ThemeProvider>
      <HelmetProvider>
        <I18nProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin/*" element={<AdminRoute />} />
              
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/:slug" element={<SeoLandingPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </I18nProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
