/* ===========================================================
   Stage.tsx — 1440×900 画板的视口适配容器
   通过 ResizeObserver 实时计算 scale，保持原始设计比例
   =========================================================== */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const DESIGN_W = 1440;
const DESIGN_H = 900;

export default function Stage({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const { pathname } = useLocation();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const compute = () => {
      const { clientWidth: w, clientHeight: h } = el;
      const s = Math.min(w / DESIGN_W, h / DESIGN_H);
      setScale(s > 0 ? s : 1);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="dh-scaler" role="presentation">
      <main
        className="dh-scaler__inner dh-route-enter"
        key={pathname}
        style={{ ['--dh-scale' as string]: scale } as CSSProperties}
      >
        {children}
      </main>
    </div>
  );
}
