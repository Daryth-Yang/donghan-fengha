/* ===========================================================
   ChapterFooter.tsx — 视口底部左右角的 上一章 / 下一章 链接
   - 不是浮动小章 widget，只是两段贴底的设计语言文本
   - 跟 KeyboardNav 的 ← / → 快捷键互为视觉提示
   =========================================================== */
import { Link, useLocation } from 'react-router-dom';
import { CHAPTERS } from './chapters';

export default function ChapterFooter() {
  const { pathname } = useLocation();
  const idx = CHAPTERS.findIndex((c) => c.path === pathname);
  if (idx < 0) return null;
  const prev = CHAPTERS[idx - 1];
  const next = CHAPTERS[idx + 1];

  return (
    <>
      {prev && (
        <Link
          to={prev.path}
          className="dh-chap-link dh-chap-link--prev"
          aria-label={`上一章 · 第 ${prev.cn} 章 · ${prev.title}`}
        >
          <span className="dh-chap-link__arrow">←</span>
          <span className="dh-chap-link__cn">{prev.cn}</span>
          <span className="dh-chap-link__title">{prev.title}</span>
        </Link>
      )}
      {next && (
        <Link
          to={next.path}
          className="dh-chap-link dh-chap-link--next"
          aria-label={`下一章 · 第 ${next.cn} 章 · ${next.title}`}
        >
          <span className="dh-chap-link__title">{next.title}</span>
          <span className="dh-chap-link__cn">{next.cn}</span>
          <span className="dh-chap-link__arrow">→</span>
        </Link>
      )}
    </>
  );
}
