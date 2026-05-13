import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Stage from './layout/Stage';
import ChapterNav, { CHAPTERS } from './layout/ChapterNav';

import Page01_Hero from './pages/Page01_Hero';
import Page02_History from './pages/Page02_History';
import Page03_Map from './pages/Page03_Map';
import Page04_Group from './pages/Page04_Group';
import Page05_Detail from './pages/Page05_Detail';
import Page06_Interaction from './pages/Page06_Interaction';
import Page07_Fracture from './pages/Page07_Fracture';
import Page08_Space from './pages/Page08_Space';
import Page09_Sound from './pages/Page09_Sound';
import Page10_Ending from './pages/Page10_Ending';

function KeyboardNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const idx = CHAPTERS.findIndex((c) => c.path === pathname);
      if (idx < 0) return;
      if ((e.key === 'ArrowRight' || e.key === 'PageDown') && idx < CHAPTERS.length - 1) {
        navigate(CHAPTERS[idx + 1].path);
      } else if ((e.key === 'ArrowLeft' || e.key === 'PageUp') && idx > 0) {
        navigate(CHAPTERS[idx - 1].path);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pathname, navigate]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <KeyboardNav />
      <Stage>
        <Routes>
          <Route path="/" element={<Page01_Hero />} />
          <Route path="/history" element={<Page02_History />} />
          <Route path="/map" element={<Page03_Map />} />
          <Route path="/figures" element={<Page04_Group />} />
          <Route path="/detail" element={<Page05_Detail />} />
          <Route path="/interaction" element={<Page06_Interaction />} />
          <Route path="/fracture" element={<Page07_Fracture />} />
          <Route path="/exhibition" element={<Page08_Space />} />
          <Route path="/sound" element={<Page09_Sound />} />
          <Route path="/ending" element={<Page10_Ending />} />
          <Route path="*" element={<Page01_Hero />} />
        </Routes>
      </Stage>
      <ChapterNav />
    </BrowserRouter>
  );
}
