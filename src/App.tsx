import { ThemeProvider } from '@/lib/ThemeContext';
import { I18nProvider } from '@/lib/i18n';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Home } from '@/pages/Home';
import { SeoLandingPage } from '@/pages/SeoLandingPage';
import { BlogList } from '@/pages/BlogList';
import { BlogPost } from '@/pages/BlogPost';

function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <I18nProvider>
          <BrowserRouter>
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
          </BrowserRouter>
        </I18nProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
