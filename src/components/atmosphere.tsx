/* ===========================================================
   atmosphere.tsx — 共用大气层 & 装饰组件
   黑金水墨视觉系统的可复用片段
   =========================================================== */
import { Fragment, useMemo, type CSSProperties, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PAGES } from '../layout/pages';

/* —— 山水剪影：背 / 中 / 前 三层 ——
   不是高耸的山峰，而是水墨在宣纸上洇开的极低起伏：
   - 三层全部压在视口下半段
   - 峰谷振幅极小（y 范围只占 4-8%），像呼吸一样的横向波动
   - 顶部完全透明，越接近底部色越浓 —— 让边缘"洇"进背景
   - CSS 再叠加 blur(远→近 渐弱) 做出水彩散开的边 */
const DH_MTN_PATHS = {
  // 远山：起伏极淡，几乎是水平线上的轻微浮动
  back:  'M 0 100 L 0 68 C 14 64 26 70 38 66 C 50 62 60 70 72 65 C 84 60 92 68 100 64 L 100 100 Z',
  // 中景：稍稍向前 + 略大起伏
  mid:   'M 0 100 L 0 78 C 16 73 28 80 40 75 C 52 70 62 80 74 74 C 86 69 94 80 100 76 L 100 100 Z',
  // 前景：最接近"地平线"，最低的鼓起
  front: 'M 0 100 L 0 88 C 18 84 30 90 42 86 C 54 82 64 90 76 86 C 88 82 96 90 100 87 L 100 100 Z',
} as const;
type DhMtnVariant = keyof typeof DH_MTN_PATHS;

const DH_MTN_STOPS: Record<DhMtnVariant, ReadonlyArray<{ offset: string; color: string }>> = {
  // 远山：顶部完全透明、中段一抹金尘、底部到不深的金粒
  back: [
    { offset: '0%',   color: 'rgba(154,122,62,0)' },
    { offset: '55%',  color: 'rgba(154,122,62,.06)' },
    { offset: '100%', color: 'rgba(201,169,97,.18)' },
  ],
  // 中景：略浓一档但仍克制
  mid: [
    { offset: '0%',   color: 'rgba(154,122,62,0)' },
    { offset: '55%',  color: 'rgba(154,122,62,.10)' },
    { offset: '100%', color: 'rgba(201,169,97,.30)' },
  ],
  // 前景：暖墨过渡到沉色 —— 不再用纯黑，保留一丝金味避免硬切
  front: [
    { offset: '0%',   color: 'rgba(40,28,12,.20)' },
    { offset: '50%',  color: 'rgba(28,20,10,.55)' },
    { offset: '100%', color: 'rgba(14,10,6,.88)' },
  ],
};

/** 单层山脉。带 `className` 让特定页面（如 Page 02）能用自己的覆盖类调整位置。 */
export function DhMountainLayer({
  variant,
  className = '',
}: {
  variant: DhMtnVariant;
  className?: string;
}) {
  const gradId = `dh-mtn-grad-${variant}`;
  return (
    <svg
      className={`dh-mountain --${variant}${className ? ' ' + className : ''}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          {DH_MTN_STOPS[variant].map((s) => (
            <stop key={s.offset} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>
      <path fill={`url(#${gradId})`} d={DH_MTN_PATHS[variant]} />
    </svg>
  );
}

export function DhMountains() {
  return (
    <>
      <DhMountainLayer variant="back" />
      <DhMountainLayer variant="mid" />
      <DhMountainLayer variant="front" />
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

/* —— 顶部导航（使用 React Router）
   注：「互动体验」section 暂时隐藏，恢复时把对应行还原 —— */
const NAV_ITEMS: ReadonlyArray<{ label: string; path: string }> = [
  { label: '首页',     path: '/' },
  { label: '历史背景', path: '/history' },
  { label: '文物群像', path: '/figures' },
  // { label: '互动体验', path: '/interaction' },
  { label: '展陈方案', path: '/exhibition' },
  { label: '尾声',     path: '/ending' },
];

export function DhTopBar({ active }: { active?: string }) {
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
      <div className="dh-meta">TouchDesigner &nbsp;·&nbsp; 数字叙事</div>
    </header>
  );
}

/* —— 分区内导航 —— 列出当前 section 下全部页面的 pill 条
   位置：贴在 chap-header 下方一条；当前页高亮，其他页 hover 提亮可跳转。
   仅当本分区 ≥ 2 页时渲染；单页分区（如展陈方案）不输出。
   自动从 useLocation 读取当前路径，无需调用方传 prop。 */
export function DhSectionNav() {
  const { pathname } = useLocation();
  const current = PAGES.find((p) => p.path === pathname);
  if (!current) return null;
  const siblings = PAGES.filter((p) => p.section === current.section);
  if (siblings.length < 2) return null;

  return (
    <nav className="dh-section-nav" aria-label={`本节 · ${current.section}`}>
      <span className="dh-caption dh-section-nav__label">本节 · {current.section}</span>
      <div className="dh-section-nav__pills">
        {siblings.map((p) => {
          const isCurrent = p.path === pathname;
          return (
            <NavLink
              key={p.path}
              to={p.path}
              end={p.path === '/'}
              className={`dh-section-nav__pill${isCurrent ? ' --current' : ''}`}
              aria-current={isCurrent ? 'page' : undefined}
              tabIndex={isCurrent ? -1 : 0}
            >
              <span className="dh-section-nav__pill-title">{p.title}</span>
              {!isCurrent && <span className="dh-section-nav__pill-arrow" aria-hidden="true">→</span>}
            </NavLink>
          );
        })}
      </div>
    </nav>
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
  label = 'SECTION',
  title,
}: {
  label?: string;
  title?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
      <span className="dh-eyebrow" style={{ color: 'var(--gold-3)' }}>——</span>
      <span className="dh-caption">{label}</span>
      {title && <span className="dh-title-s" style={{ marginLeft: 8 }}>{title}</span>}
    </div>
  );
}

/* —— 陶俑视觉：优先用真照片，缺图时回退到 CSS 占位 ——
   照片放在 public/figurines/{code-lowercase}.png（如 fig-01.png）
   组件会自动把 code 转成文件名；onError 时回退到旧的剪影占位。 */
export function DhFigurine({
  width = 100,
  height = 200,
  label = '击鼓说唱俑',
  code = 'FIG-01',
  featured = false,
  showHalo = false,
  src,
}: {
  /** 像素数字（180）或 CSS 长度字符串（'clamp(180px, 16vw, 320px)'） */
  width?: number | string;
  height?: number | string;
  label?: string;
  code?: string;
  featured?: boolean;
  showHalo?: boolean;
  src?: string;
}) {
  const imgSrc = src ?? `/figurines/${code.toLowerCase()}.png`;
  return (
    <div className="dh-figurine-wrap" style={{ position: 'relative', width, height }}>
      {showHalo && <div className="dh-halo" style={{ inset: -30 }} aria-hidden="true" />}

      {/* 真照片层 —— 居中、保持比例、去背景。加载失败时被 ::before 占位接管 */}
      <img
        src={imgSrc}
        alt={`${label} · ${code}`}
        className={`dh-figurine-img ${featured ? '--featured' : ''}`}
        loading="lazy"
        onError={(e) => {
          // 图片不存在时：隐藏 img、显示同级 fallback
          const el = e.currentTarget;
          el.style.display = 'none';
          const fb = el.nextElementSibling as HTMLElement | null;
          if (fb) fb.style.display = 'flex';
        }}
        style={{
          width,
          height,
          objectFit: 'contain',
          objectPosition: 'center bottom',
        }}
      />

      {/* Fallback：原 CSS 占位（默认隐藏，img 加载失败时显示） */}
      <div
        className="dh-figurine"
        role="img"
        aria-label={`${label} · ${code}`}
        style={{
          display: 'none',
          position: 'absolute', inset: 0,
          width, height,
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
  /** 像素数字（200）或 CSS 长度字符串（'clamp(...)' / calc()） */
  size?: number | string;
  x?: string | number;
  y?: string | number;
}) {
  const insetAt = (i: number): number | string =>
    typeof size === 'number'
      ? -i * (size / count / 2)
      : `calc(${size} / ${count * 2} * ${-i})`;
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
            inset: insetAt(i),
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
