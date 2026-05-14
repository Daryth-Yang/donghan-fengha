import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DhTopBar, DhMist, DhParticles, DhSection, DhSectionNav, DhFigurine, DhCorners, cn } from '../components/atmosphere';

type Ripple = { id: number; x: number; y: number };

const GLOW_VARIANTS = [
  { id: 'shadow', cn: '影', en: 'SHADOW' },
  { id: 'spot',   cn: '柱', en: 'SPOT'   },
] as const;
type GlowId = typeof GLOW_VARIANTS[number]['id'];

export default function Page04_Group() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('glow');
  const glow: GlowId = (GLOW_VARIANTS.find(v => v.id === raw)?.id ?? 'shadow');

  // ===== 鼠标跟随光环 + 点击扩散波纹 =====
  const stageRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // hover 焦点:默认锁定 C 位(index 2),鼠标进入其他俑时切换内容
  const [focusIdx, setFocusIdx] = useState(2);

  // 鼠标移动:用 rAF 节流，写入 CSS 变量 --mx / --my（px），不触发 React 重渲染
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
        el.setAttribute('data-cursor', '1');
      });
    };
    const onLeave = () => el.setAttribute('data-cursor', '0');
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // 点击:在点击位置生成一圈扩散波纹，1.1 秒后清除（防止内存堆积）
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const id = performance.now();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setRipples(prev => [...prev, { id, x, y }]);
    window.setTimeout(() => {
      setRipples(prev => prev.filter(p => p.id !== id));
    }, 1100);
  };
  // 俑尺寸 clamp：side 保持不变；hero 放大约 1.5×，给 C 位明显"主角架势"
  const SIDE_W = 'clamp(140px, 13vw, 240px)';
  const SIDE_H = 'clamp(200px, 18vw, 340px)';
  const HERO_W = 'clamp(200px, 20vw, 380px)';
  const HERO_H = 'clamp(280px, 28vw, 530px)';
  const figures = [
    { cn: "陶俳优俑", code: "FIG-04", w: SIDE_W, h: SIDE_H, kw: "戏谑 · 民间",   one: "他的身体像一段凝固的表演，保留着民间艺人的夸张与幽默。" },
    { cn: "陶说唱俑", code: "FIG-02", w: SIDE_W, h: SIDE_H, kw: "笑声 · 吐舌",   one: "他张口、弯腰、吐舌，把苦难讲成笑话，也把笑话变成历史。" },
    { cn: "击鼓说唱俑", code: "FIG-01", w: HERO_W, h: HERO_H, kw: "鼓点 · 主叙事", one: "他不是战争的英雄，却用一面小鼓敲开乱世中普通人的笑声。", featured: true },
    { cn: "说唱俑",   code: "FIG-03", w: SIDE_W, h: SIDE_H, kw: "蜀地 · 百戏",   one: "他来自巴蜀的生活现场，连接着汉代说唱与民间娱乐。" },
    { cn: "陶俳优俑 · 尾声", code: "FIG-05", w: SIDE_W, h: SIDE_H, kw: "群像 · 消散", one: "他像最后一个退场的表演者，在粒子消散前回望观众。" },
  ];

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="文物群像" />
        <DhMist />
        <DhParticles count={70} seed={17} opacityRange={[.2, .55]} />

        <div className="dh-p04__header">
          <DhSection label="FIVE FIGURES · 半圆舞台" title="五个俑 · 五种民间表情" />
          <div className="dh-p04__glow-toggle" role="radiogroup" aria-label="背景光样式">
            <span className="dh-caption" style={{ opacity: .6 }}>背景光</span>
            {GLOW_VARIANTS.map(v => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={glow === v.id}
                className={`dh-p04__glow-btn ${glow === v.id ? '--active' : ''}`}
                onClick={() => setParams({ glow: v.id })}
                title={v.en}
              >
                {v.cn}
              </button>
            ))}
          </div>
        </div>

        <DhSectionNav />

        {/* 半圆舞台 */}
        <div
          ref={stageRef}
          className={`dh-p04__stage --glow-${glow}`}
          onClick={handleClick}
          data-cursor="0"
        >
          {/* 舞台背景：陶土色弧形 + 一条贯穿五俑脚的实线弧（外圈保留，内圈虚线已移除） */}
          <svg viewBox="0 0 1328 530" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <radialGradient id="stage" cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor="#3a2c14" stopOpacity=".55"/>
                <stop offset="60%" stopColor="#15121a" stopOpacity=".25"/>
                <stop offset="100%" stopColor="#07060a" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <ellipse cx="664" cy="600" rx="700" ry="320" fill="url(#stage)" />
            <ellipse cx="664" cy="600" rx="700" ry="320" fill="none" stroke="rgba(154,122,62,.25)" strokeWidth="1" />
          </svg>

          {/* 鼠标跟随的 2 道极细金环 */}
          <div className="dh-p04__cursor-rings" aria-hidden="true">
            <div className="dh-p04__cursor-ring --r1" />
            <div className="dh-p04__cursor-ring --r2" />
          </div>

          {/* 点击产生的扩散波纹 */}
          {ripples.map(r => (
            <span
              key={r.id}
              className="dh-p04__ripple"
              style={{ left: r.x, top: r.y }}
              aria-hidden="true"
            />
          ))}

          {/* 五个俑 —— 半圆排布 */}
          <div style={{ position: "absolute", inset: 0 }}>
            {figures.map((f, i) => {
              const total = figures.length;
              const ratio = total > 1 ? i / (total - 1) : 0.5;
              const xPct = 12 + ratio * 76;
              /* 弧线纵向位置：增大 sin 系数后只把 C 位再往上拉，侧位不动 —— 给焦点卡留呼吸。
                 公式:36 - sin(ratio·π) · 19 →  侧位 36%，C 位 17%。 */
              const yPct = 36 - Math.sin(ratio * Math.PI) * 19;
              const figNum = f.code.replace(/^FIG-/, '');
              return (
                <Link
                  key={i}
                  to={`/detail?fig=${figNum}`}
                  className={`dh-p04__figure ${f.featured ? '--featured' : ''} ${focusIdx === i ? '--focused' : ''}`}
                  style={{ left: `${xPct}%`, top: `${yPct}%`, textDecoration: 'none', color: 'inherit' }}
                  onMouseEnter={() => setFocusIdx(i)}
                  onFocus={() => setFocusIdx(i)}
                  aria-label={`查看 ${f.cn} 详情`}
                >
                  {/* 舞台 = 俑同尺寸的盒子；C 位自动波纹已删除，鼓点交互交给鼠标跟随圈 + 点击涟漪 */}
                  <div className="dh-p04__figure-stage" style={{ width: f.w, height: f.h }}>
                    <DhFigurine width={f.w} height={f.h} label={f.cn} code={f.code} featured={f.featured} />
                  </div>
                  <div className="dh-caption" style={{ marginTop: 14, color: "var(--gold-2)" }}>{`零·${cn(i + 1)}`}</div>
                  <div className="dh-title-s" style={{ marginTop: 6 }}>{f.cn}</div>
                  <div className="dh-body" style={{ color: "var(--paper-3)", marginTop: 4, letterSpacing: ".22em" }}>{f.kw}</div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* hover 焦点卡:跟随鼠标 hover 的俑切换内容；离开五俑区不重置（保留最后看的那个） */}
        <aside className="dh-p04__focus-card" aria-live="polite">
          <div className="dh-p04__focus-card-inner" key={focusIdx}>
            <div className="dh-eyebrow dh-p04__focus-card-meta">
              FOCUS · {figures[focusIdx].code} · 零 · {cn(focusIdx + 1)}
            </div>
            <h3 className="dh-title-m dh-p04__focus-card-title">
              {figures[focusIdx].cn}
            </h3>
            <div className="dh-caption dh-p04__focus-card-kw">
              {figures[focusIdx].kw}
            </div>
            <p className="dh-body dh-p04__focus-card-desc">
              {figures[focusIdx].one}
            </p>
          </div>
        </aside>

        <DhCorners />
      </div>
    </div>
  );
}
