import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Stage from './layout/Stage';
import ChapterNav, { CHAPTERS } from './layout/ChapterNav';
import ErrorBoundary from './components/ErrorBoundary';

const Page01_Hero        = lazy(() => import('./pages/Page01_Hero'));
const Page02_History     = lazy(() => import('./pages/Page02_History'));
const Page03_Map         = lazy(() => import('./pages/Page03_Map'));
const Page04_Group       = lazy(() => import('./pages/Page04_Group'));
const Page05_Detail      = lazy(() => import('./pages/Page05_Detail'));
const Page06_Interaction = lazy(() => import('./pages/Page06_Interaction'));
const Page07_Fracture    = lazy(() => import('./pages/Page07_Fracture'));
const Page08_Space       = lazy(() => import('./pages/Page08_Space'));
const Page09_Sound       = lazy(() => import('./pages/Page09_Sound'));
const Page10_Ending      = lazy(() => import('./pages/Page10_Ending'));
const NotFound           = lazy(() => import('./pages/NotFound'));

function KeyboardNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) {
        return;
      }
      const idx = CHAPTERS.findIndex((c) => c.path === pathname);
      if (idx < 0) return;
      if ((e.key === 'ArrowRight' || e.key === 'PageDown') && idx < CHAPTERS.length - 1) {
        e.preventDefault();
        navigate(CHAPTERS[idx + 1].path);
      } else if ((e.key === 'ArrowLeft' || e.key === 'PageUp') && idx > 0) {
        e.preventDefault();
        navigate(CHAPTERS[idx - 1].path);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pathname, navigate]);
  return null;
}

function RouteFallback() {
  return (
    <div className="dh-stage">
      <div className="dh-frame" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="dh-caption" style={{ color: 'var(--gold-3)' }}>LOADING · 鼓声临近 …</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <KeyboardNav />
      <Stage>
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/"             element={<Page01_Hero />} />
              <Route path="/history"      element={<Page02_History />} />
              <Route path="/map"          element={<Page03_Map />} />
              <Route path="/figures"      element={<Page04_Group />} />
              <Route path="/detail"       element={<Page05_Detail />} />
              <Route path="/interaction"  element={<Page06_Interaction />} />
              <Route path="/fracture"     element={<Page07_Fracture />} />
              <Route path="/exhibition"   element={<Page08_Space />} />
              <Route path="/sound"        element={<Page09_Sound />} />
              <Route path="/ending"       element={<Page10_Ending />} />
              <Route path="*"             element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Stage>
      <ChapterNav />
    </BrowserRouter>
  );
}
