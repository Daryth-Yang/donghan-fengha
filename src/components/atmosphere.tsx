/* ===========================================================
   atmosphere.tsx — 共用大气层 & 装饰组件
   黑金水墨视觉系统的可复用片段
   =========================================================== */
import { Fragment, useMemo, type CSSProperties, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

/* —— 山水剪影：背 / 中 / 前 三层 —— */
export function DhMountains() {
  return (
    <>
      <div className="dh-mountain --back" />
      <div className="dh-mountain --mid" />
      <div className="dh-mountain --front" />
    </>
  );
}

/* —— 墨雾 —— */
export function DhMist() {
  return <div className="dh-mist" />;
}

/* —— 金色粒子云 ——
   注意：sizeRange/opacityRange 用元组解构后取标量进 deps，避免
   父组件每次 render 传入新数组字面量导致 useMemo 失效、120 个粒子
   重新构造、所有 CSS 动画从头重启。 */
type DhParticlesProps = {
  count?: number;
  area?: 'full' | 'bottom' | 'top';
  seed?: number;
  sizeRange?: readonly [number, number];
  opacityRange?: readonly [number, number];
};

const DEFAULT_SIZE_RANGE = [1, 3] as const;
const DEFAULT_OPACITY_RANGE = [0.25, 0.9] as const;

export function DhParticles({
  count = 80,
  area = 'full',
  seed = 1,
  sizeRange = DEFAULT_SIZE_RANGE,
  opacityRange = DEFAULT_OPACITY_RANGE,
}: DhParticlesProps) {
  const [sMin, sMax] = sizeRange;
  const [oMin, oMax] = opacityRange;
  const dots = useMemo(() => {
    let s = seed * 9301 + 49297;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const arr: Array<{
      x: number; y: number; size: number; op: number; dur: number; delay: number; hue: string;
    }> = [];
    for (let i = 0; i < count; i++) {
      const x = rand() * 100;
      let y = rand() * 100;
      if (area === 'bottom') y = 55 + rand() * 45;
      if (area === 'top') y = rand() * 45;
      const size = sMin + rand() * (sMax - sMin);
      const op = oMin + rand() * (oMax - oMin);
      const dur = 4 + rand() * 8;
      const delay = -rand() * dur;
      arr.push({ x, y, size, op, dur, delay, hue: rand() > 0.7 ? '#f4dfa6' : '#c9a961' });
    }
    return arr;
  }, [count, area, seed, sMin, sMax, oMin, oMax]);

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {dots.map((d, i) => (
        <div
          key={i}
          className="dh-dot"
          style={{
            left: d.x + '%',
            top: d.y + '%',
            width: d.size,
            height: d.size,
            background: d.hue,
            boxShadow: `0 0 ${d.size * 3}px ${d.hue}`,
            ['--d' as string]: d.dur + 's',
            ['--delay' as string]: d.delay + 's',
            ['--dot-op-min' as string]: d.op * 0.3,
            ['--dot-op-max' as string]: d.op,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

/* —— 顶部导航（使用 React Router） —— */
const NAV_ITEMS: ReadonlyArray<{ label: string; path: string }> = [
  { label: '首页', path: '/' },
  { label: '历史背景', path: '/history' },
  { label: '文物群像', path: '/figures' },
  { label: '互动体验', path: '/interaction' },
  { label: '展陈方案', path: '/exhibition' },
];

export function DhTopBar({ active, page = '01' }: { active?: string; page?: string }) {
  return (
    <header className="dh-topbar" role="banner">
      <NavLink to="/" className="dh-brand" style={{ textDecoration: 'none' }} aria-label="东汉风华 · 俳优之志 · 回到首页">
        <div className="dh-brand-mark" aria-hidden="true" />
        <span>东汉风华 · 俳优之志</span>
      </NavLink>
      <nav className="dh-nav" aria-label="主导航">
        {NAV_ITEMS.map((n) => (
          <NavLink
            key={n.label}
            to={n.path}
            end={n.path === '/'}
            className={({ isActive }) =>
              (active ? n.label === active : isActive) ? '--active' : ''
            }
          >
            {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="dh-meta" aria-label={`第 ${page} 章 · 共 10 章`}>CH · {page} / 10 &nbsp;·&nbsp; TouchDesigner</div>
    </header>
  );
}

/* —— 卷轴侧边竖排小标 —— */
export function DhSideMark({
  children,
  position = 'left',
  top = 120,
}: {
  children: ReactNode;
  position?: 'left' | 'right';
  top?: number;
}) {
  const style: CSSProperties =
    position === 'left'
      ? { left: 28, top, writingMode: 'vertical-rl' }
      : { right: 28, top, writingMode: 'vertical-rl' };
  return <div className="dh-side-vert" style={style}>{children}</div>;
}

/* —— 角章 —— */
export function DhSeal({ ch = '鼓', style }: { ch?: string; style?: CSSProperties }) {
  return <div className="dh-seal" style={style} aria-hidden="true">{ch}</div>;
}

/* —— 角点装饰 —— */
export function DhCorners() {
  return (
    <div aria-hidden="true">
      <div className="dh-corner tl" />
      <div className="dh-corner tr" />
      <div className="dh-corner bl" />
      <div className="dh-corner br" />
    </div>
  );
}

/* —— 标号 + 章节名 —— */
export function DhSection({
  num = '01',
  label = 'SECTION',
  title,
}: {
  num?: string;
  label?: string;
  title?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
      <span className="dh-eyebrow" style={{ color: 'var(--gold-3)' }}>—— {num}</span>
      <span className="dh-caption">{label}</span>
      {title && <span className="dh-title-s" style={{ marginLeft: 8 }}>{title}</span>}
    </div>
  );
}

/* —— 陶俑剪影占位 —— */
export function DhFigurine({
  width = 100,
  height = 200,
  label = '击鼓说唱俑',
  code = 'FIG-01',
  featured = false,
  showHalo = false,
}: {
  width?: number;
  height?: number;
  label?: string;
  code?: string;
  featured?: boolean;
  showHalo?: boolean;
}) {
  return (
    <div style={{ position: 'relative', width, height }}>
      {showHalo && <div className="dh-halo" style={{ inset: -30 }} aria-hidden="true" />}
      <div
        className="dh-figurine"
        role="img"
        aria-label={`${label} · ${code}`}
        style={{
          width,
          height,
          boxShadow: featured
            ? '0 0 40px rgba(201,169,97,.25), inset 0 -40px 60px rgba(201,169,97,.12)'
            : 'inset 0 -30px 50px rgba(201,169,97,.06)',
        }}
      >
        <span className="--cn" aria-hidden="true">{label}</span>
        <span className="--label" style={{ alignSelf: 'flex-start' }} aria-hidden="true">{code}</span>
      </div>
    </div>
  );
}

/* —— 鼓点波纹 —— */
export function DhRipples({
  count = 4,
  size = 200,
  x = '50%',
  y = '50%',
}: {
  count?: number;
  size?: number;
  x?: string | number;
  y?: string | number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%,-50%)',
        width: size,
        height: size,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="dh-ripple"
          style={{
            inset: -i * (size / count / 2),
            ['--i' as string]: i,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

/* —— 横向汉代回纹条 —— */
export function DhMeander({ width = 320 }: { width?: number }) {
  return <div className="dh-meander" style={{ width }} aria-hidden="true" />;
}

/* —— 中文数字（一 ~ 二十） —— */
const CN_NUM = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'] as const;
export function cn(n: number): string {
  if (n < 0) return String(n);
  if (n <= 10) return CN_NUM[n];
  if (n < 20) return '十' + CN_NUM[n - 10];
  return String(n);
}

/* —— Fragment 导出辅助 —— */
export const F = Fragment;
