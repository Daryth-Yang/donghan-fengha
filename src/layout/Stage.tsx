/* ===========================================================
   Stage.tsx — 1440×900 画板的视口适配容器
   策略：fit (min scale) + 顶对齐 + 视口级水墨气氛延展
   - 画板顶部贴齐视口顶部（topbar 永远在浏览器顶端）
   - 画板按宽 / 高较小者等比缩放，保持设计完整、不变形不裁切
   - 画板下方 / 两侧的留白由 .dh-scaler 自带的远山 + 暗金辉光延展填满
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
          transform: `translateX(-50%) scale(${scale})`,
          ['--dh-scale' as string]: scale,
        } as CSSProperties}
      >
        {children}
      </main>
    </div>
  );
}
