import { ThemeProvider } from '@/lib/ThemeContext';
import { I18nProvider } from '@/lib/i18n';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Home } from '@/pages/Home';
import { Suspense, lazy } from 'react';

const SeoLandingPage = lazy(() => import('@/pages/SeoLandingPage').then(module => ({ default: module.SeoLandingPage })));
const BlogList = lazy(() => import('@/pages/BlogList').then(module => ({ default: module.BlogList })));
const BlogPost = lazy(() => import('@/pages/BlogPost').then(module => ({ default: module.BlogPost })));
const TrajetTemplate = lazy(() => import('@/pages/TrajetTemplate').then(module => ({ default: module.TrajetTemplate })));
const Partenaires = lazy(() => import('@/pages/Partenaires').then(module => ({ default: module.Partenaires })));

function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <I18nProvider>
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-950"><div className="w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/trajets/:slug" element={<TrajetTemplate />} />
                <Route path="/partenaires" element={<Partenaires />} />
                <Route path="/:slug" element={<SeoLandingPage />} />
              </Route>
            </Routes>
            </Suspense>
          </BrowserRouter>
        </I18nProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
