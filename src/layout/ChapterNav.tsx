/* ===========================================================
   ChapterNav.tsx — 浮动章节快捷导航（右下角）
   提供 10 章之间的快速跳转 + 上下章 + 键盘提示
   =========================================================== */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type Chapter = {
  num: string;       // "01"
  cn: string;        // "壹"
  path: string;
  title: string;
  nav: string;       // 顶部导航 label
};

export const CHAPTERS: Chapter[] = [
  { num: '01', cn: '壹', path: '/',             title: '启动 · 东汉风华',     nav: '首页' },
  { num: '02', cn: '贰', path: '/history',      title: '历史 · 王朝将倾',     nav: '历史背景' },
  { num: '03', cn: '叁', path: '/map',          title: '叙事 · 山水长卷',     nav: '历史背景' },
  { num: '04', cn: '肆', path: '/figures',      title: '五俑 · 民间表情',     nav: '文物群像' },
  { num: '05', cn: '伍', path: '/detail',       title: '档案 · 文物详情',     nav: '文物群像' },
  { num: '06', cn: '陆', path: '/interaction',  title: '互动 · 手势鼓槌',     nav: '互动体验' },
  { num: '07', cn: '柒', path: '/fracture',     title: '破碎 · 重构再生',     nav: '互动体验' },
  { num: '08', cn: '捌', path: '/exhibition',   title: '展陈 · 现场动线',     nav: '展陈方案' },
  { num: '09', cn: '玖', path: '/sound',        title: '声音 · 鼓点节奏',     nav: '互动体验' },
  { num: '10', cn: '拾', path: '/ending',       title: '结尾 · 笑声归尘',     nav: '首页' },
];

const HINT_KEY = 'donghan.nav-hint-seen';

export default function ChapterNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const idx = useMemo(() => CHAPTERS.findIndex((c) => c.path === pathname), [pathname]);

  const [showHint, setShowHint] = useState(() => {
    try { return localStorage.getItem(HINT_KEY) !== '1'; } catch { return true; }
  });
  useEffect(() => {
    if (!showHint) return;
    const dismiss = () => {
      setShowHint(false);
      try { localStorage.setItem(HINT_KEY, '1'); } catch {}
    };
    const t = setTimeout(dismiss, 6000);
    window.addEventListener('keydown', dismiss, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', dismiss);
    };
  }, [showHint]);

  if (idx < 0) return null;
  const prev = CHAPTERS[idx - 1];
  const next = CHAPTERS[idx + 1];

  return (
    <nav
      aria-label="章节快捷导航"
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 100,
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      {showHint && (
        <div
          aria-hidden="true"
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            right: 0,
            bottom: 'calc(100% + 10px)',
            padding: '6px 12px',
            fontFamily: 'var(--sf-mono)',
            fontSize: 10,
            letterSpacing: '.32em',
            color: 'var(--gold-3)',
            background: 'rgba(7,6,10,.72)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(154,122,62,.32)',
            whiteSpace: 'nowrap',
          }}
        >
          ← →  键盘翻章
        </div>
      )}

      {prev && (
        <button
          type="button"
          onClick={() => navigate(prev.path)}
          title={`上一章 · ${prev.num} · ${prev.title}`}
          aria-label={`上一章 · 第 ${prev.cn} 章 · ${prev.title}`}
          className="dh-btn-ghost dh-nav-btn"
          style={{ padding: '8px 14px', fontSize: 11, pointerEvents: 'auto' }}
        >
          ← {prev.num}
        </button>
      )}
      <div
        role="tablist"
        aria-label="跳转到指定章节"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          gap: 6,
          padding: '8px 12px',
          background: 'rgba(7,6,10,.72)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(154,122,62,.32)',
        }}
      >
        {CHAPTERS.map((c, i) => {
          const active = i === idx;
          return (
            <button
              key={c.path}
              type="button"
              role="tab"
              aria-selected={active}
              aria-current={active ? 'page' : undefined}
              aria-label={`第 ${c.cn} 章 · ${c.title}`}
              title={`${c.cn} · ${c.title}`}
              onClick={() => navigate(c.path)}
              className="dh-nav-chip"
              data-active={active || undefined}
              style={{
                width: 22,
                height: 22,
                border: '1px solid var(--gold-2)',
                background: active ? 'rgba(40,30,18,.6)' : 'transparent',
                boxShadow: active ? '0 0 12px rgba(230,200,132,.55), inset 0 0 8px rgba(201,169,97,.25)' : 'none',
                cursor: 'pointer',
                fontFamily: 'var(--sf-serif)',
                fontSize: 12,
                color: active ? 'var(--gold-4)' : 'var(--gold-2)',
                letterSpacing: 0,
                padding: 0,
                lineHeight: 1,
                transition: 'all .25s ease',
              }}
            >
              {c.cn}
            </button>
          );
        })}
      </div>
      {next && (
        <button
          type="button"
          onClick={() => navigate(next.path)}
          title={`下一章 · ${next.num} · ${next.title}`}
          aria-label={`下一章 · 第 ${next.cn} 章 · ${next.title}`}
          className="dh-btn-ghost dh-nav-btn"
          style={{ padding: '8px 14px', fontSize: 11, pointerEvents: 'auto' }}
        >
          {next.num} →
        </button>
      )}
    </nav>
  );
}
