/* ===========================================================
   Stage.tsx — 视口容器
   不再整体缩放画板，由各章节内部用 vw / vh / clamp 自适应排版
   =========================================================== */
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export default function Stage({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <main className="dh-scaler dh-route-enter" key={pathname} role="presentation">
      {children}
    </main>
  );
}
