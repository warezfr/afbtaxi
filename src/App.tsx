import { ThemeProvider } from '@/lib/ThemeContext';
import { I18nProvider } from '@/lib/i18n';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion, useReducedMotion } from 'motion/react';

import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Home } from '@/pages/Home';
import { Suspense, lazy } from 'react';

const SeoLandingPage = lazy(() => import('@/pages/SeoLandingPage').then(module => ({ default: module.SeoLandingPage })));
const BlogList = lazy(() => import('@/pages/BlogList').then(module => ({ default: module.BlogList })));
const BlogPost = lazy(() => import('@/pages/BlogPost').then(module => ({ default: module.BlogPost })));
const TrajetTemplate = lazy(() => import('@/pages/TrajetTemplate').then(module => ({ default: module.TrajetTemplate })));
const Partenaires = lazy(() => import('@/pages/Partenaires').then(module => ({ default: module.Partenaires })));
const NotFound = lazy(() => import('@/pages/NotFound').then(module => ({ default: module.NotFound })));

function PageSkeleton() {
  const reduce = useReducedMotion();
  return (
    <div className="fixed inset-0 bg-zinc-50 dark:bg-zinc-950" role="status" aria-label="Chargement">
      <motion.div
        className="h-0.5 origin-left bg-gold-500"
        initial={{ scaleX: reduce ? 1 : 0 }}
        animate={reduce ? { scaleX: 1 } : { scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={reduce ? undefined : { duration: 1.4, ease: [0.16, 1, 0.3, 1], repeat: Infinity }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <I18nProvider>
          <BrowserRouter>
            <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/trajets/:slug" element={<TrajetTemplate />} />
                <Route path="/partenaires" element={<Partenaires />} />
                <Route path="/:slug" element={<SeoLandingPage />} />
                <Route path="*" element={<NotFound />} />
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
