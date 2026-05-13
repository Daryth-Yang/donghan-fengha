/* ===========================================================
   ChapterNav.tsx — 浮动章节快捷导航（右下角）
   提供 10 章之间的快速跳转 + 上下章
   =========================================================== */
import { useMemo } from 'react';
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

export default function ChapterNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const idx = useMemo(() => CHAPTERS.findIndex((c) => c.path === pathname), [pathname]);

  if (idx < 0) return null;
  const prev = CHAPTERS[idx - 1];
  const next = CHAPTERS[idx + 1];

  return (
    <div
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
      {prev && (
        <button
          onClick={() => navigate(prev.path)}
          title={`${prev.num} · ${prev.title}`}
          className="dh-btn-ghost"
          style={{ padding: '8px 14px', fontSize: 11, pointerEvents: 'auto' }}
        >
          ← {prev.num}
        </button>
      )}
      <div
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
        {CHAPTERS.map((c, i) => (
          <button
            key={c.path}
            onClick={() => navigate(c.path)}
            title={`${c.cn} · ${c.title}`}
            style={{
              width: 18,
              height: 18,
              border: '1px solid var(--gold-2)',
              background: i === idx ? 'var(--gold-3)' : 'transparent',
              boxShadow: i === idx ? '0 0 10px rgba(230,200,132,.7)' : 'none',
              cursor: 'pointer',
              fontFamily: 'var(--sf-serif)',
              fontSize: 10,
              color: i === idx ? 'var(--ink-0)' : 'var(--gold-3)',
              letterSpacing: 0,
              padding: 0,
              lineHeight: 1,
            }}
          >
            {c.cn}
          </button>
        ))}
      </div>
      {next && (
        <button
          onClick={() => navigate(next.path)}
          title={`${next.num} · ${next.title}`}
          className="dh-btn-ghost"
          style={{ padding: '8px 14px', fontSize: 11, pointerEvents: 'auto' }}
        >
          {next.num} →
        </button>
      )}
    </div>
  );
}
