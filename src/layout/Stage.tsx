/* ===========================================================
   Stage.tsx — 1440×900 画板的视口适配容器
   策略：cover 模式（max scale）—— 画板铺满整个浏览器窗口
   - 必要时裁剪掉极少量边缘装饰（DhCorners / 侧边竖排标）
   - 顶部 64px 的内部导航留空，由视口级 GlobalTopBar 覆盖
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
      // cover：取较大者，让设计铺满整个视口
      const s = Math.max(w / DESIGN_W, h / DESIGN_H);
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
          transform: `translate(-50%, -50%) scale(${scale})`,
          ['--dh-scale' as string]: scale,
        } as CSSProperties}
      >
        {children}
      </main>
    </div>
  );
}
