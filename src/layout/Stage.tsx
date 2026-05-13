/* ===========================================================
   Stage.tsx — 1440×900 画板的视口适配容器
   策略：fit 模式（min scale）—— 保持设计完整性，不裁切不变形
   - 视口比 16:10 越接近，外缘留白越少
   - 配合纯深色背景与画板内自带的水墨气氛，留白区域不形成 框
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
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale})`,
          ['--dh-scale' as string]: scale,
        } as CSSProperties}
      >
        {children}
      </main>
    </div>
  );
}
